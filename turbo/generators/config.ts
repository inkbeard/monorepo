import { ESLint } from 'eslint';
import type { PlopTypes } from '@turbo/gen';
import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const exec = util.promisify(child_process.exec);

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // const isNewPackage = (componentType: string) => componentType === 'packages';
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
      // Confirm if new package
      {
        type: 'confirm',
        name: 'isNewPackage',
        message: 'Is this a new component/package?',
      },
      // Get component's desired location
      {
        when: ({ isNewPackage }) => !isNewPackage,
        type: 'list',
        name: 'workspace',
        message: 'What current package should the component be added to?',
        choices: function () {
          return fs
            .readdirSync(path.join(
              __dirname,
              '../../packages/',
            ))
            .filter(function (file) {
              return ![
                'apps',
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
          if (data.isNewPackage && !input.startsWith('App')) {
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

          if (
            (
              !data.isNewPackage
              && fs.existsSync(`packages/${input}/`)
            )
            || (
              !data.isNewPackage &&
              fs.existsSync(`packages/${data.workspace}/src/components/${pascalCase(input)}.vue`)
            )
          ) {
            return `"${input}" already exists.`;
          }

          return true;
        },
      },
      // Check if component extends PrimeVue component
      {
        when: ({ isNewPackage }) => isNewPackage,
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
      const componentNameKebab = kebabCase(data.componentName);
      const description = !data.isPrimeVue && data.description.slice(-1) === '.'
        ? data.description
        : `${data.description}.`;
      const componentTemplate = data.isPrimeVue ? 'PrimeVue' : 'TsComponent';
      // const uiVuePath = `${root}/packages/ui-vue`;
      const templateFolder = 'templates/vue-component';
      const uiLibraryPath = `${root}/apps/ui-library`;
      let workspacePath = `${root}/packages`;

      if (data.isNewPackage) {
        workspacePath += `/${data.componentNameKebab}`;
      } else {
        workspacePath += `/${data.workspace}`;
      }

      /* eslint-disable no-param-reassign */
      data.componentName = componentName;
      data.description = description.replace(/^\w/, (c: string) => c.toUpperCase());
      data.componentNameLower = lowerCase(componentName);
      data.storyCategory = data.workspace ? data.workspace.replace('-', ' ') : null;
      data.primeVueComponentNameLower = lowerCase(data.primeVueComponentName);
      data.primeVueComponentNamePascal = pascalCase(data.primeVueComponentName);
      data.extendsPrimeVue = data.primeVueComponentName;
      data.hasStoryCategory = data.workspace !== 'packages';
      /* eslint-enable no-param-reassign */

      const newPackageActions: PlopTypes.Actions = [
        // Add readme
        {
          type: 'add',
          path: `${workspacePath}/README.md`,
          templateFile: `${templateFolder}/README.md.hbs`,
        },
        // Add package
        {
          type: 'add',
          path: `${workspacePath}/package.json`,
          templateFile: `${templateFolder}/package.json.hbs`,
        },
        // Add tsconfig
        {
          type: 'add',
          path: `${workspacePath}/tsconfig.json`,
          templateFile: `${templateFolder}/tsconfig.json.hbs`,
        },
        // Add tsconfig.app
        {
          type: 'add',
          path: `${workspacePath}/tsconfig.app.json`,
          templateFile: `${templateFolder}/tsconfig.app.json.hbs`,
        },
        // Add tsconfig.node
        {
          type: 'add',
          path: `${workspacePath}/tsconfig.node.json`,
          templateFile: `${templateFolder}/tsconfig.node.json.hbs`,
        },
        // Add tsconfig.vitest
        {
          type: 'add',
          path: `${workspacePath}/tsconfig.vitest.json`,
          templateFile: `${templateFolder}/tsconfig.vitest.json.hbs`,
        },
        // Add index.ts
        {
          type: 'add',
          path: `${workspacePath}/index.ts`,
          templateFile: `${templateFolder}/index.ts.hbs`,
        },
        // Add vite.config.js
        {
          type: 'add',
          path: `${workspacePath}/vite.config.ts`,
          templateFile: `${templateFolder}/vite.config.ts.hbs`,
        },
        // Add vitest.config.js
        {
          type: 'add',
          path: `${workspacePath}/vitest.config.ts`,
          templateFile: `${templateFolder}/vitest.config.ts.hbs`,
        },
        // Add component to ui-component-library dependencies
        {
          type: 'modify',
          path: `${uiLibraryPath}/package.json`,
          transform: (fileContents) => {
            const packageJson = JSON.parse(fileContents);

            packageJson.dependencies[`@inkbeard/${componentNameKebab}`] = 'workspace:*';
            packageJson.dependencies = Object.fromEntries(
              Object.entries(packageJson.dependencies).sort((a, b) => a[0].localeCompare(b[0])),
            );

            return JSON.stringify(packageJson, null, 2);
          },
        },
      ];

      const actions: PlopTypes.Actions = [
        // Add component file
        {
          type: 'add',
          path: `${workspacePath}/src/components/${componentName}.vue`,
          templateFile: `${templateFolder}/${componentTemplate}.vue.hbs`,
        },
        // Add component test file
        {
          type: 'add',
          path: `${workspacePath}/src/components/__tests__/${componentName}.spec.ts`,
          templateFile: `${templateFolder}/${componentTemplate}.spec.ts.hbs`,
        },
        // Add component story file
        {
          type: 'add',
          path: `${uiLibraryPath}/src/stories/${componentName}.stories.js`,
          templateFile: `${templateFolder}/${componentTemplate}.stories.js.hbs`,
        },
        // Add component changelog
        {
          type: 'add',
          path: `${root}/.changeset/${componentName}-${data.workspace || 'component'}.md`,
          templateFile: `${templateFolder}/changeset.md.hbs`,
        },
        // Add ui library changelog
        {
          type: 'add',
          path: `${root}/.changeset/${componentName}-ui-library.md`,
          templateFile: 'templates/ui-library/changeset.md.hbs',
        },
      ];

      if (data.isNewPackage) {
        actions.unshift(...newPackageActions);
      } else {
        // Add component to ui-vue export
        actions.push(
          {
            type: 'modify',
              path: `${workspacePath}/index.ts`,
                transform: async function eslintAction(contents: string) {
                  console.log('modifying index.ts');
                  const filePath = `${workspacePath}/index.ts`;
                  /**
                   * import/export the new component in the ui-vue index.ts file.
                   */
                  const content = fs.readFileSync(`${workspacePath}/index.ts`, 'utf8');
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
        );
      }


      if (data.createPr) {
        actions.push({
          type: 'openPr',
        });
      }

      return actions;
    },
  });
}
