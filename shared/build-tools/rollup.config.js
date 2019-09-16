import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';

const consumerPath = process.cwd();
const pkg = require(`${consumerPath}/package.json`);

export default {
    input: pkg.source,
    output: [
        {
            file: `${consumerPath}/${pkg.main}`,
            format: 'esm',
        },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        eslint({
            config: `${__dirname}/../../.eslintrc`,
            ignorePath: `${__dirname}/../../.eslintignore`,
            throwOnError: process.env.NODE_ENV === 'production',
        }),
        typescript({
            typescript: require('typescript'),
            exclude: ['**/*.stories.tsx', '**/*.js', 'node_modules'],
            verbosity: 1,
            tsconfig: `${__dirname}/../../tsconfig.json`,
            tsconfigOverride: {
                compilerOptions: {
                    typeRoots: [`node_modules/@types`, `${__dirname}/../types`],
                },
            },
        }),
        postcss({
            minimize: true,
            namedExports: true,
            modules: {
                camelCase: 'dashesOnly',
                context: consumerPath,
                generateScopedName: '[name]_[local]_[hash:base64:10]',
            },
        }),
    ],
};
