# MB Design System

[![Netlify Status](https://api.netlify.com/api/v1/badges/2777df6c-361b-42f4-b149-c6672212a3db/deploy-status)](https://app.netlify.com/sites/friendly-bose-a575fc/deploys)

## Getting started

If you are looking to consume the components for building applications please see the [documentation site](https://friendly-bose-a575fc.netlify.com) for the list of components and props. 

If you are going to work on the components in this repo; clone this repo, from your terminal navigate into this repo and run `yarn install`. 

## Docs of all components

For live examples of components please see the [design system](https://friendly-bose-a575fc.netlify.com)

For making updates to the gatsby instance that generates the documentation, see the `packages/docs/readme.md` for details on how the documentation is generated.

## Local development of individual components

All packages are found in `packages/*`. Navigate to the component directory you want are working on and run `yarn dev`. This will spin up a rollup instance watching the `Component.tsx` file you want to develop on and run the corresponding `Component.mdx` file for the visual example. 

*Note that the mdx file is injected with the corresponding component so you do not have to import it on it's own.* This is because the documentation can be used in multiple places (docs/local development) and the resolution path can change. 

## Adding a new component

Create a new folder with `CamelCase` naming under the `/packages` folder. The only exception to this is the `docs` folder which is where the documentation is generated from. (See it's readme for details on how it works)

Each component file should have one React component export as default. If you need multiple exported modules, use multiple component files and an `index.tsx` file to export the shipped modules. 

### Folder structure

The folder structure for a component should look like: 

```
- ComponentName
    - src
        - index.tsx // (optional) if you have multiple exports from a module
        - ComponentName.tsx // Actual component should export as default
        - ComponentName.mdx // Documentation for viewing live components
        - ComponentName.module.scss // styles using CSS Modules for namespacing
        - __tests__ // tests need to be in test folder so react-docgen can generate types and ignore these files
            - ComponentName.test.tsx // tests written
    - package.json
```

### package.json

Your `package.json` should look like the following:

```
{
    "name": "@mindbody/component-name",
    "version": "1.2.3",
    "source": "src/ComponentName.tsx",
    "main": "dist/ComponentName.js",
    "types": "dist/ComponentName/src/ComponentName.d.ts",
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
- `main` is where the compiled code will be put after the build occurs as well as tell the consuming user where the import will come from. This will allow the consuming dev to `import ComponentName from '@mindbody/component-name'` and the package.json will point it to the compiled code.
- `types` let's the consuming user see the type definitions

### Local configs

*All of these configurations are targeted towards the use of VSCode*

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

*Early 2019 the [TypeScript roadmap](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) pointed out they are moving in favor of ESLint over TSLint*