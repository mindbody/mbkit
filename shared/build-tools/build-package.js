#!/usr/bin/env node

const execSync = require('child_process').execSync;
const args = require('yargs').argv;

const rollup = `${__dirname}/../../node_modules/.bin/rollup`;
const rollupConfig = `${__dirname}/rollup.config.js`;

const exec = (command, extraEnv) =>
    execSync(command, {
        stdio: 'inherit',
        env: Object.assign({}, process.env, extraEnv),
    });

const watch = args.watch ? `--watch` : '';
const environment = args.env ? args.env : 'production';
exec(`${rollup} -c ${rollupConfig} ${watch}`, {
    NODE_ENV: environment,
});
