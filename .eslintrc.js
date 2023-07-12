module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'jest/globals': true,
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: {
                node: true,
            },
            plugins: ['jest'],
            extends: ['eslint:recommended', 'plugin:jest/recommended'],
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
}
