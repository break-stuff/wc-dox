import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import multi from '@rollup/plugin-multi-entry';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';

export default [
  /** bundle components for the CDN */
  {
    watch: false,
    input: Object.fromEntries(
      globSync('src/**/*.ts', {
        ignore: [
          'src/**/*.test.ts',
          'src/**/*.stories.ts',
          'src/**/*.styles.ts',
        ],
      }).map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length),
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
    ),
    output: {
      dir: 'cdn',
      format: 'esm',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'cdn',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
      }),
      summary(),
    ],
  },
  {
    watch: {
      buildDelay: 150,
    },
    input: Object.fromEntries(
      globSync('src/**/*.ts', {
        ignore: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
      }).map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length),
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
    ),
    output: {
      dir: 'cdn',
      format: 'esm',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'cdn',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
    ],
  },

  /** bundle components for sandboxes */
  {
    watch: false,
    input: globSync('src/**/index.ts'),
    output: {
      format: 'esm',
      dir: 'public/html',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'public/html',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
      multi({
        entryFileName: 'index.js',
      }),
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
      }),
      summary(),
    ],
  },
  {
    watch: {
      buildDelay: 150,
    },
    input: globSync('src/**/index.ts'),
    output: {
      format: 'esm',
      dir: 'public/html',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'public/html',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
      multi({
        entryFileName: 'index.js',
      }),
    ],
  },

  /** bundle react components for sandboxes */
  {
    watch: false,
    input: 'react/index.js',
    output: {
      format: 'esm',
      file: 'public/react/index.js',
      sourcemap: false,
    },
    external: ['react'],
    plugins: [
      resolve(),
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
      }),
      summary(),
    ],
    onwarn(warning) {
      if (
        /Could not resolve import/.test(warning.message) ||
        /'this' keyword is equivalent to 'undefined'/.test(warning.message)
      ) {
        return;
      }

      console.error(warning.message);
    },
  },
  {
    watch: {
      buildDelay: 150,
    },
    input: 'react/index.js',
    output: {
      format: 'esm',
      file: 'public/react/index.js',
      sourcemap: false,
    },
    external: ['react'],
    plugins: [resolve()],
    onwarn(warning) {
      if (
        /Could not resolve import/.test(warning.message) ||
        /'this' keyword is equivalent to 'undefined'/.test(warning.message)
      ) {
        return;
      }

      console.error(warning.message);
    },
  },
  // bundle react component types for sandboxes
  {
    watch: false,
    input: './react/index.d.ts',
    output: [{ file: 'public/react/index.d.ts', format: 'es' }],
    external: ['react'],
    plugins: [dts(), resolve(), summary()],
  },
  {
    watch: {
      buildDelay: 150,
    },
    input: './react/index.d.ts',
    output: [{ file: 'public/react/index.d.ts', format: 'es' }],
    external: ['react'],
    plugins: [dts(), resolve()],
  },
];
