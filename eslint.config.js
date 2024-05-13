module.exports = {
    languageOptions: {
        globals: {
            browser: true,
            commonjs: true,
            es2021: true,
        },
        parserOptions: {
            ecmaVersion: 'latest',
        },
    },
    rules: {
        'array-bracket-newline': [
            'error',
            'consistent',
        ],
        'array-bracket-spacing': [
            'error',
            'never',
        ],
        'array-element-newline': [
            'error',
            'consistent',
        ],
        'brace-style': [
            'error',
            '1tbs',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        'comma-style': [
            'error',
            'last',
        ],
        'computed-property-spacing': [
            'error',
            'never',
        ],
        'consistent-this': [
            'error',
            'self',
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'func-call-spacing': 'off',
        'func-name-matching': 'error',
        'func-style': [
            'error',
            'declaration',
            {
                allowArrowFunctions: true,
            },
        ],
        'function-call-argument-newline': [
            'error',
            'never',
        ],
        'function-paren-newline': [
            'error',
            'multiline',
        ],
        'implicit-arrow-linebreak': [
            'error',
            'beside',
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            },
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'multiline-comment-style': [
            'error',
            'separate-lines',
        ],
        'multiline-ternary': [
            'error',
            'always-multiline',
        ],
        'no-array-constructor': 'error',
        'no-inline-comments': 0,
        'no-lonely-if': 'error',
        'no-mixed-operators': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        'no-new-object': 'error',
        'no-tabs': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': [
            'error',
            'beside',
        ],
        'object-curly-newline': [
            'error',
            {
                consistent: true,
            },
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'object-property-newline': [
            'error',
            {
                allowMultiplePropertiesPerLine: true,
            },
        ],
        'one-var': [
            'error',
            'never',
        ],
        'one-var-declaration-per-line': [
            'error',
            'initializations',
        ],
        'operator-assignment': [
            'error',
            'always',
        ],
        'padded-blocks': [
            'error',
            'never',
        ],
        'quote-props': [
            'error',
            'as-needed',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'semi-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        'semi-style': [
            'error',
            'last',
        ],
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                exceptions: [
                    '-+',
                ],
            },
        ],
        'switch-colon-spacing': 'error',
        'arrow-body-style': [
            'error',
            'as-needed',
        ],
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
    },
};
