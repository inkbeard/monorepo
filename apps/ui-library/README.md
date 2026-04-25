## Inkbeard UI Library

To view the components, color palette, and typography for all inkbeard products, make sure Turborepo is installed according to the latest instructions from [Turborepo's documentation](https://turbo.build/repo/docs/installing).

From the root of the monorepo, run the following command:

    ```shell
    # Install the dependencies
    pnpm i

    # Start the server
    pnpm --filter @inkbeard/ui-library dev
    ```

## Learning Storybook

1. Read the introductory tutorial at [Learn Storybook](https://storybook.js.org/tutorials/intro-to-storybook/vue/en/get-started/).
2. Learn how to transform your component libraries into design systems in our [Design Systems for Developers](https://storybook.js.org/tutorials/design-systems-for-developers/) tutorial.
3. See the official documentation at [Storybook](https://storybook.js.org/).

## Deployment

The Storybook for the UI Library is deployed to Vercel. To deploy, push your changes to the `main` branch and Vercel will automatically build and deploy the Storybook. You can view the deployed Storybook at https://inkbeard-ui-library.vercel.app.
