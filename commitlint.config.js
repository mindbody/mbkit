module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
    rules: {
        'type-enum': () => {
            const types = [
                'build',
                'ci',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'style',
                'test',
                'chore',
                'release',
            ];
            return [2, 'always', types];
        },
        'header-max-length': [2, 'always', 150],
    },
};
