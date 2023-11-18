module.exports = {
  extends: ["eslint:recommended", "next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "@stylistic/eslint-plugin-jsx",
    "@stylistic/eslint-plugin-js",
  ],
  root: true,
  rules: {
    semi: ["error", "never"],
    "@typescript-eslint/consistent-type-imports": ["error", {
      fixStyle: "separate-type-imports",
      prefer: "type-imports"
    }],
    quotes: ["error", "double"],
    
    "react/no-unescaped-entities": [0],
    
    "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline"],
    "@stylistic/jsx/jsx-props-no-multi-spaces": ["error"],
    "@stylistic/jsx/jsx-max-props-per-line": ["error", {
      "maximum": {
        single: 1,
        multi: 1
      }
    }],
    "@stylistic/jsx/jsx-closing-bracket-location": ["error", "line-aligned"],

    "@stylistic/js/object-property-newline": ["error"],
    
    // "sort-imports": ["error", {
    //   "ignoreCase": true,
    //   "ignoreDeclarationSort": false,
    //   "ignoreMemberSort": false,
    //   "memberSyntaxSortOrder": [
    //     "single",
    //     "multiple",
    //     "all",
    //     "none",
    //   ],
    //   "allowSeparatedGroups": true
    // }]
  }
}
