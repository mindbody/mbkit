#!/usr/bin/env node

const execSync = require('child_process').execSync;
const exec = (command, extraEnv) =>
    execSync(command, {
        stdio: 'inherit',
        env: Object.assign({}, process.env, extraEnv),
    });

const consumerPath = process.cwd();

const generateLocalDev = `${__dirname}/dev-generate-local-server.js --consumerPath=${consumerPath}`;
const rollupBuildPackage = `${__dirname}/build-package.js --env=development`;
const startLocalDevServer = `yarn parcel ${__dirname}/local-server/index.html --open`;

// First generate local dev bundle and build bundle once (so it exists and we don't see any errors if it doesn't)
// Then run build package with watch and start local dev server
exec(
    `${generateLocalDev} && ${rollupBuildPackage} && yarn concurrently --kill-others "${rollupBuildPackage} --watch" "${startLocalDevServer}"`,
    {
        NODE_ENV: 'development',
    },
);
