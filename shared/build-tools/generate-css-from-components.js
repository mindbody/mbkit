#!/usr/bin/env node

const getFiles = require('node-recursive-directory');
const fs = require('fs');
const { exit } = require('process');

// Get all the component files from /dist/cjs
// copy out the _css section that includes all css to be injected ino the header
// create a css file in /cjs and /esm from the copied css
async function generateCss() {
    try {
        const allFiles = await getFiles('./packages/**/dist/cjs');
        const allComponentFiles = allFiles.filter(file => file.includes('.js'));

        for(fileLocation of allComponentFiles) {
            let file = await fs.readFileSync(fileLocation, 'utf8');
            const indexOfCss = file.indexOf('var css_');
            const indexOfEndOfCss = file.indexOf('}";');
            if(~indexOfCss){
                const cssRaw = file.substring(indexOfCss, indexOfEndOfCss + 3);
                const groupFolderLocation = fileLocation.substring(0, fileLocation.indexOf('dist'));
                const css = `${cssRaw.substring(cssRaw.indexOf('"') + 1, cssRaw.indexOf('}";') + 1)}`;
                fs.writeFileSync(`${groupFolderLocation}/dist/cjs/styles.css`, css);
                fs.writeFileSync(`${groupFolderLocation}/dist/esm/styles.css`, css);
            }
        }
    } catch( error ) {
        console.error(error);
        exit(1)
    }
}

generateCss();