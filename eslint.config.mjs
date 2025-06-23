import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["dist/**", "build/**", "node_modules/**", ".eslintcache"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
        Buffer: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      boundaries: boundariesPlugin,
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "comma-dangle": [
        "warn",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@app/**", group: "internal", position: "before" },
            { pattern: "@pages/**", group: "internal", position: "before" },
            { pattern: "@widgets/**", group: "internal", position: "before" },
            { pattern: "@features/**", group: "internal", position: "before" },
            { pattern: "@entities/**", group: "internal", position: "before" },
            { pattern: "@shared/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      "boundaries/element-types": [
        "warn",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: [
                "app",
                "pages",
                "widgets",
                "features",
                "entities",
                "shared",
              ],
            },
            {
              from: "pages",
              allow: ["shared", "entities", "features", "widgets"],
            },
            {
              from: "widgets",
              allow: ["shared", "entities", "features"],
            },
            {
              from: "features",
              allow: ["shared", "entities"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true,
        },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**/*" },
        { type: "pages", pattern: "src/pages/**/*" },
        { type: "widgets", pattern: "src/widgets/**/*" },
        {
          type: "features",
          pattern: "src/features/**/*",
          capture: ["module"],
        },
        {
          type: "entities",
          pattern: "src/entities/**/*",
          capture: ["module"],
        },
        { type: "shared", pattern: "src/shared/**/*" },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*", "@widgets/*", "@features/*"],
              message:
                "🚨 FSD 위반: shared 계층은 다른 상위 계층을 import할 수 없습니다!",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/entities/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*", "@widgets/*", "@features/*"],
              message:
                "🚨 FSD 위반: entities 계층은 상위 계층을 import할 수 없습니다!",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*", "@widgets/*"],
              message:
                "🚨 FSD 위반: features 계층은 상위 계층을 import할 수 없습니다!",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/widgets/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*"],
              message:
                "🚨 FSD 위반: widgets 계층은 app, pages 계층을 import할 수 없습니다!",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/pages/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@app/*"],
              message:
                "🚨 FSD 위반: pages 계층은 app 계층을 import할 수 없습니다!",
            },
          ],
        },
      ],
    },
  },
];
