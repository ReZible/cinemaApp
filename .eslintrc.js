module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:prettier/recommended',
		'plugin:react/jsx-runtime',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	ignorePatterns: [],
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'import/prefer-default-export': ['off'],
		'react/prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/jsx-no-bind': [
			2,
			{ allowArrowFunctions: true, allowFunctions: true },
		],
		'default-param-last': ['off'],
	},
};
