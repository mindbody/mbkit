#!/usr/bin/env node

/**
 * This file is ran on `build` time of the Theme package
 *
 * This will generate a SCSS file with all the theme variables in the css variable format
 */

/* eslint-disable */

const fs = require('fs');
const theme = require('../base-theme.json');
const generateScssVariables = require('./recursive-generate-scss-variables.js');

const scss = generateScssVariables({ theme });
fs.writeFileSync(`${__dirname}/../../dist/base-theme.scss`, scss, err => {
    if (!err) {
        console.log('SCSS variables created');
    }
});

module.exports = generateScssVariables;
