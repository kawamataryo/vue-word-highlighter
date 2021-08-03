module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {

  },
  "ignorePatterns": ["**/dist/**/*.*", "**/*/jest.config.js"]
};
