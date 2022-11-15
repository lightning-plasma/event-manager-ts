module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "eslint-config-prettier"
  ],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"],
  },
  globals: {
    window: true
  },
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "@typescript-eslint/comma-dangle": ["error", "only-multiline"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        "": "never",
      },
    ],
  },
};
