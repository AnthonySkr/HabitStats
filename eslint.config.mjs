import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import configPrettier from "eslint-config-prettier";

export default [
  // 1. Configurations globales
  {
    ignores: [
      "**/node_modules/",
      "packages/frontend/dist/",
    ],
  },

  // 2. Configuration par défaut pour tous les fichiers JS/JSX
  js.configs.recommended,

  // 3. Configuration pour le Backend (Node.js)
  {
    files: ["packages/backend/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 4. Configuration pour le Frontend (React)
  {
    files: ["packages/frontend/**/*.{js,jsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      // Détecte automatiquement la version de React
      react: {
        version: "detect",
      },
    },
    // Applique les règles recommandées pour React
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
  },

  // 5. Configuration Prettier
  // Désactive toutes les règles ESLint qui pourraient entrer en conflit avec Prettier
  configPrettier,
];
