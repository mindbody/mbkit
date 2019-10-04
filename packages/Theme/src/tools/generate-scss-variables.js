#!/usr/bin/env node

/**
 * This file is ran on `build` time of the Theme package
 *
 * This will generate a SCSS file with all the theme variables in the css variable format
 */

/* eslint-disable */

const fs = require('fs');
const theme = require('../base-theme.json');

function generateScssVariables({ theme, varSeed = '--', scssSeed = '' }) {
    return Object.keys(theme)
        .map(key => {
            const nextValue = theme[key];

            if (typeof nextValue === 'object') {
                return generateScssVariables({
                    theme: nextValue,
                    varSeed: `${varSeed}${key}-`,
                    scssSeed: `${scssSeed}${key}-`,
                });
            }

            return `$${scssSeed}${key}: var(${varSeed}${key}, ${nextValue});
`;
        })
        .join('');
}

const scss = generateScssVariables({ theme });
fs.writeFileSync(`${__dirname}/../../dist/base-theme.scss`, scss, err => {
    if (!err) {
        console.log('SCSS variables created');
    }
});

module.exports = generateScssVariables;
