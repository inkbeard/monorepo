import { ESLint } from 'eslint';
import type { PlopTypes } from '@turbo/gen';
import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const exec = util.promisify(child_process.exec);

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const kebabCase = plop.getHelper('kebabCase');
  const pascalCase = plop.getHelper('pascalCase');
  const lowerCase = plop.getHelper('lowerCase');

  plop.setActionType('openPr', ({ componentName }: { componentName?: string }) =>
    exec(`git add .; git commit -m 'Added ${componentName} template'; mergify stack`)
      .then(() => 'successfully created PR!')
      .catch((err) => `error creating PR: ${err}`)
  );

  plop.setGenerator('vue-component', {
    description: 'Adds a new vue 3 typescript component.',
    prompts: [
      // Get component's desired location
      {
        type: 'list',
        name: 'workspace',
        message: 'What workspace should the component be added to?',
        choices: function () {
          return fs
            .readdirSync(path.join(
              __dirname,
              '../../packages/',
            ))
            .filter(function (file) {
              return ![
                'eslint-config',
                'stylelint-config',
                'typescript-config',
                'ui',
                'ui-theme',
              ].includes(file)
                && fs
                  .statSync(path.join(__dirname, '../../packages/', file))
                  .isDirectory();
            });
        },
      },
      // Get component name
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the component?',
        validate: (input: string, data: any) => {
          if (data.workspace === 'ui-vue' && !input.startsWith('App')) {
            return 'Name must start with "App".';
          }

          if (!input) {
            return 'Name is required.';
          }

          if (!kebabCase(input).includes('-')) {
            return 'Name must be at least 2 words (AppButton, ExpenseItem, etc).';
          }

          if (input.includes('.')) {
            return 'Name cannot include an extension.';
          }

          if (input.includes(' ')) {
            return 'Name cannot include spaces.';
          }

          if (fs.existsSync(`packages/${data.workspace}/src/components/${pascalCase(input)}.vue`)) {
            return `"${pascalCase(input)}.vue" already exists.`;
          }

          return true;
        },
      },
      // Check if component extends PrimeVue component
      {
        when: ({ workspace }) => workspace === 'ui-vue',
        type: 'confirm',
        name: 'isPrimeVue',
        message: 'Is this component extending a PrimeVue component?',
      },
      // Get PrimeVue component name
      {
        when: ({ isPrimeVue }) => isPrimeVue,
        type: 'input',
        name: 'primeVueComponentName',
        message: 'What is the name of the PrimeVue component?',
        default: ({ componentName = '' }) => componentName.replace('App', ''),
        validate: (input: string) => {
          if (!input) {
            return 'Name is required.';
          }

          if (input.includes('.')) {
            return 'Name cannot include an extension.';
          }

          if (input.includes(' ')) {
            return 'Name cannot include spaces.';
          }

          return true;
        },
      },
      // Get component description if not PrimeVue
      {
        when: ({ isPrimeVue }) => !isPrimeVue,
        type: 'input',
        name: 'description',
        message: 'What is the description of the new component?',
        validate: (input: string) => {
          if (!input) {
            return 'Description is required';
          }

          return true;
        },
      },
      // Create PR
      {
        type: 'confirm',
        name: 'createPr',
        message: 'Would you like a PR created?',
      },
    ],
    actions(data = {}) {
      const { root } = data.turbo.paths
      const componentName = pascalCase(data.componentName);
      const description = !data.isPrimeVue && data.description.slice(-1) === '.'
        ? data.description
        : `${data.description}.`;
      const componentTemplate = data.isPrimeVue ? 'PrimeVue' : 'TsComponent';
      const uiVuePath = `${root}/packages/ui-vue`;
      const templateFolder = 'templates/vue-component';

      /* eslint-disable no-param-reassign */
      data.componentName = componentName;
      data.description = description.replace(/^\w/, (c: string) => c.toUpperCase());
      data.componentNameLower = lowerCase(componentName);
      data.storyCategory = data.workspace.replace('-', ' ')
      data.primeVueComponentNameLower = lowerCase(data.primeVueComponentName);
      data.primeVueComponentNamePascal = pascalCase(data.primeVueComponentName);
      /* eslint-enable no-param-reassign */

      const actions: PlopTypes.Actions = [
        // Add component file
        {
          type: 'add',
          path: `${uiVuePath}/src/components/${componentName}.vue`,
          templateFile: `${templateFolder}/${componentTemplate}.vue.hbs`,
        },
        // Add component test file
        {
          type: 'add',
          path: `${uiVuePath}/src/components/__tests__/${componentName}.spec.ts`,
          templateFile: `${templateFolder}/${componentTemplate}.spec.ts.hbs`,
        },
        // Add component to ui-vue export
        {
          type: 'modify',
          path: `${uiVuePath}/index.ts`,
          transform: async function eslintAction(contents: string) {
            console.log('modifying index.ts');
            const filePath = `${uiVuePath}/index.ts`;
            /**
             * import/export the new component in the ui-vue index.ts file.
             */
            const content = fs.readFileSync(`${uiVuePath}/index.ts`, 'utf8');
            const lines = content.split('\n');
            const lineIndex = lines.findIndex(line => line.includes('export {'));
            lines.splice(lineIndex + 1, 0, `  ${componentName},`);
            lines.splice(lineIndex - 1, 0, `import ${componentName} from './src/components/${componentName}.vue';`);
            const newContent = lines.join('\n');

            fs.writeFileSync(filePath, newContent, 'utf8');

            /**
             * Run eslint to fix the import/export order and sort the exports.
             */
            const eslint = new ESLint({
              fix: true,
              cwd: plop.getDestBasePath(),
              overrideConfig: {
                plugins: ['sort-exports'],
                rules: {
                  'sort-exports/sort-exports': [
                    'error',
                    { sortDir: 'asc' },
                  ],
                },
              },
            });
            console.log('sorting exports...');
            const [data] = await eslint.lintFiles(filePath);

            if (data?.messages) {
              console.error({ messages: data?.messages });
            }

            return data?.output || contents;
          },
        },
        // Add component story file
        {
          type: 'add',
          path: `${root}/apps/ui-library/src/stories/${componentName}.stories.ts`,
          templateFile: `${templateFolder}/${componentTemplate}.stories.ts.hbs`,
        },
        // Add component changelog
        {
          type: 'add',
          path: `${root}/.changeset/${componentName}-${data.workspace}.md`,
          templateFile: `${templateFolder}/changeset.md.hbs`,
        },
        // Add ui library changelog
        {
          type: 'add',
          path: `${root}/.changeset/${componentName}-ui-library.md`,
          templateFile: 'templates/ui-library/changeset.md.hbs',
        },
      ];

      if (data.createPr) {
        actions.push({
          type: 'openPr',
        });
      }

      return actions;
    },
  });

  plop.setGenerator('vue-component-package', {
    description: 'Adds a new vue 3 typescript component package.',
    prompts: [
      // Get package name
      {
        type: 'input',
        name: 'packageName',
        message: 'What is the hyphenated name of the package?',
        validate: (input: string, data: any) => {
          if (!input) {
            return 'Name is required.';
          }

          if (input.includes('.')) {
            return 'Name cannot include an extension.';
          }

          if (input.includes(' ')) {
            return 'Name cannot include spaces.';
          }

          if (fs.existsSync(`packages/${data.workspace}`)) {
            return `"input" already exists.`;
          }

          return true;
        },
      },
    ],
    actions(data = {}) {
      return [
        // Add all files
        {
          type: 'addMany',
          destination: `${data.turbo.paths.root}/packages/${data.packageName}`,
          base: 'templates/vue-component-package',
          templateFiles: 'templates/vue-component-package/**/*',
        },
      ];
    },
  });
}
