module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 9,
      "sourceType": "module"
  },
  "extends": ["plugin:compat/recommended"],
  "env": {
    "browser": true
  },
  settings: {
    browsers: "last 2 versions, not ie <= 11",
    polyfills: [
      // Mark Intl.PluralRules as polyfilled, since we import it `intl-pluralrules` in src/resolver.js
      // This is needed for both IE 11 and Safari
      "Intl.PluralRules",
    ]
  }
}
