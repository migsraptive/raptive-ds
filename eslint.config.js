import fs from 'node:fs'
import path from 'node:path'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const browserGlobals = [
  'Blob',
  'Event',
  'FileReader',
  'FormData',
  'HTMLInputElement',
  'HTMLElement',
  'Image',
  'IntersectionObserver',
  'Node',
  'ResizeObserver',
  'URL',
  'URLSearchParams',
  'cancelAnimationFrame',
  'clearInterval',
  'clearTimeout',
  'console',
  'document',
  'fetch',
  'globalThis',
  'localStorage',
  'navigator',
  'requestAnimationFrame',
  'sessionStorage',
  'setInterval',
  'setTimeout',
  'window',
].reduce((globals, name) => {
  globals[name] = 'readonly'
  return globals
}, {})

const importExtensions = ['.js', '.jsx', '.mjs', '.cjs', '.json']

function resolvesRelativeImport(source, filename) {
  const basePath = path.resolve(path.dirname(filename), source)

  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return true
  }

  if (importExtensions.some((extension) => fs.existsSync(`${basePath}${extension}`))) {
    return true
  }

  return importExtensions.some((extension) => fs.existsSync(path.join(basePath, `index${extension}`)))
}

const localImportChecks = {
  rules: {
    'no-unresolved-relative-imports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require relative imports to resolve to a local file.',
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const source = node.source.value

            if (typeof source !== 'string' || !source.startsWith('.')) {
              return
            }

            const filename = context.filename ?? context.getFilename()

            if (!filename || filename === '<input>') {
              return
            }

            if (!resolvesRelativeImport(source, filename)) {
              context.report({
                node: node.source,
                message: `Unable to resolve relative import "${source}".`,
              })
            }
          },
        }
      },
    },
  },
}

export default [
  {
    ignores: [
      '.playwright-mcp/**',
      '.vercel/**',
      'dist/**',
      'node_modules/**',
    ],
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: browserGlobals,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      local: localImportChecks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'local/no-unresolved-relative-imports': 'error',
      'no-duplicate-imports': 'error',
      'no-undef': 'error',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      }],
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]
