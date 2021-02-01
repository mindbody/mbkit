# MBKit

[![Netlify Status](https://api.netlify.com/api/v1/badges/2777df6c-361b-42f4-b149-c6672212a3db/deploy-status)](https://app.netlify.com/sites/mbkit/deploys)

## Getting started

If you'd like to consume the components for building applications, please see the [documentation site](https://mbkit.netlify.com) for the full list of components, props, and examples. 

If you'd like to make changes to the components, clone this repo and run `yarn install` in the root directory. 

## Updating components

All component packages are found in `packages/*`. ~Navigate to the component directory and run `yarn dev`. This will create a [Rollup](https://rollupjs.org/guide/en/) instance watching the `Component.tsx` file you want to update along with running the corresponding `Component.mdx` file for the visual example.~ (deprecating)

~*Note: The mdx file automatically injects the corresponding component; you don't have to import it directly.* This is done so the documentation can be used in multiple places (docs/local development) and the resolution path can change.~

Currently MDX will still be used as code examples; once we get examples of all the components in storybook we will look into integrating that into MBKit's site.

If working on a component use `yarn storybook` at the root level, check to see if the component has a corresponding storybook file; if not create one using the `Modal.stories.tsx` as an example. 

## Adding a new component

Create a new folder with `CamelCase` naming under the `/packages` folder. (The only exception to this is the `docs` folder which is where the documentation site is generated from. See its [README](https://github.com/mindbody/mbkit/tree/master/packages/docs) for details on how it works)

Each component file should have one React component export as default. If you need multiple exported modules, use multiple component files and an `index.tsx` file to export the shipped modules. 

### Folder structure

The folder structure for a component should look like: 

```
- ComponentName
    - src
        - index.tsx // Always export components as named exports
        - ComponentName.tsx // Component should export as default
        - ComponentName.mdx (deprecating) // Documentation for viewing live components
        - ComponentName.stories.tsx // Documentation for viewing live components
        - ComponentName.module.scss // styles using CSS Modules for namespacing
        - __tests__ // tests need to be in test folder so react-docgen can generate types and ignore these files
            - ComponentName.test.tsx // tests written
    - tsconfig.json // extend the root tsconfig to keep packages similar
    - package.json
```

### package.json

Your `package.json` should look like the following:

```
{
    "name": "@mbkit/component-name",
    "version": "1.0.0",
    "source": "src/index.tsx",
    "main": "dist/ComponentName.js",
    "types": "dist/index.d.ts",
    "publishConfig": {
        "access": "public"
    },
    "scripts": {
        "build": "../../shared/build-tools/build-package.js",
        "dev": "../../shared/build-tools/dev-package.js"
    },
    "license": "MIT",
    "devDependencies": {
        "@types/react": "^16.9.2",
        "react": "^16.9.0"
    },
    "peerDependencies": {
        "react": "^16.9.0"
    }
}
```

- `source` is where the build tools will look to compile the code. 
- `main` is where the compiled code will be placed after the build finishes along with telling the consuming user where the import will come from. This will allow the consuming dev to `import ComponentName from '@mbkit/component-name'` and the package.json will point to the compiled code.
- `types` lets the consuming user see the type definitions

### Local configs

#### ESLint

[Plugin for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Install the ESLint for VSCode plugin and add the following to your local settings to get ESLint to show up on TypeScript files:

```JSON
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
],
```

*The early-2019 [TypeScript roadmap](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) points out them favoring ESLint over TSLint*
