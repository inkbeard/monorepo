import type { PlopTypes } from '@turbo/gen';
import fs from 'fs';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const kebabCase = plop.getHelper('kebabCase');
  const pascalCase = plop.getHelper('pascalCase');
  const lowerCase = plop.getHelper('lowerCase');

  plop.setGenerator('vue-component', {
    description: 'Adds a new vue 3 typescript component.',
    prompts: [
      // Get component name
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the component?',
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

          if (fs.existsSync(`packages/ui-vue/src/components/${pascalCase(input)}.vue`)) {
            return `"${pascalCase(input)}.vue" already exists.`;
          }

          return true;
        },
      },
      // Check if component extends PrimeVue component
      {
        type: 'confirm',
        name: 'isPrimeVue',
        message: 'Is this component extending a PrimeVue component?',
      },
      // Get PrimeVue component name
      {
        when: ({ isPrimeVue }) => isPrimeVue,
        type: 'input',
        name: 'PrimeVueComponentName',
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
    ],
    actions(data = {}) {
      const { root } = data.turbo.paths
      const componentName = pascalCase(data.componentName);
      const description = !data.isPrimeVue && data.description.slice(-1) === '.'
        ? data.description
        : `${data.description}.`;
      const componentTemplate = data.isPrimeVue ? 'PrimeVue' : 'TsComponent';
      const uiVuePath = `${root}/packages/ui-vue`;
      const templateFolder = 'templates/ui-vue';

      /* eslint-disable no-param-reassign */
      data.componentName = componentName;
      data.description = description.replace(/^\w/, (c: string) => c.toUpperCase());
      data.componentNameLower = lowerCase(componentName);
      data.componentNameKebabCase = kebabCase(componentName);
      data.primeVueComponentNameLower = lowerCase(data.PrimeVueComponentName);
      data.primeVueComponentNamePascal = pascalCase(data.PrimeVueComponentName);
      data.primeVueComponentNameKebab = kebabCase(data.PrimeVueComponentName);
      /* eslint-enable no-param-reassign */

      const actions = [
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
      ];

      return actions;
    },
  });
}
