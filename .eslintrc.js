module.exports = {
  extends: ["eslint:recommended", "next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    semi: ["error", "never"],
    "@typescript-eslint/consistent-type-imports": ["error", {
      fixStyle: "separate-type-imports",
      prefer: "type-imports"
    }],
    quotes: ["error", "double"],
    "react/no-unescaped-entities": [0]
  }
}
