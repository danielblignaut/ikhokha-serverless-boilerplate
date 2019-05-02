const path = require('path')

module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-console": ["warn"],
    "@typescript-eslint/no-empty-interface": ["warn"],
    "@typescript-eslint/indent": ["error", "tab"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "none"
        },
        "singleline": {
          "delimiter": "semi"
        }
      }
    ],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["jest", "@typescript-eslint"],
  "overrides": [
    {
      
        "files": ["**/__client_tests__/**", "**/__server_tests__/**", "**/*.test.{ts,js,jsx,tsx}", ],
        "settings": {
          "import/resolver": {
            "jest": {
              "jestConfigFile": path.join(__dirname, './jest-common-config.ts'),
            },
          },
        },
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-unused-vars": ["off"]
      }
    },
    
  ]
}
