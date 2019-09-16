#!/usr/bin/env node

const execSync = require('child_process').execSync;
const exec = (command, extraEnv) =>
    execSync(command, {
        stdio: 'inherit',
        env: Object.assign({}, process.env, extraEnv),
    });

const consumerPath = process.cwd();

const generateLocalDev = `${__dirname}/dev-generate-local-server.js --consumerPath=${consumerPath}`;
const rollupBuildPackage = `${__dirname}/build-package.js --watch --env=development`;
const startLocalDevServer = `yarn parcel ${__dirname}/local-server/index.html --open`;

exec(`${generateLocalDev} && yarn concurrently --kill-others "${rollupBuildPackage}" "${startLocalDevServer}"`, {
    NODE_ENV: 'development',
});
