import { customElementReactWrapperPlugin } from 'custom-element-react-wrappers';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';
import { customElementSolidJsPlugin } from 'custom-element-solidjs-integration';
import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
import { customElementSveltePlugin } from 'custom-element-svelte-integration';
import { cemDeprecatorPlugin } from 'custom-elements-manifest-deprecator';
import { cemSorterPlugin } from "@wc-toolkit/cem-sorter";
import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance";
import { jsDocTagsPlugin } from "@wc-toolkit/jsdoc-tags";
import { getTsProgram, typeParserPlugin } from "@wc-toolkit/type-parser";
import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { lazyLoaderPlugin } from "@wc-toolkit/lazy-loader";


const getTagBase = tagName => tagName.split('-').slice(1).join('-');

export default {
  /** Globs to analyze */
  globs: ['src/components/**/*.ts'],
  /** Globs to exclude */
  exclude: [
    'src/**/*.test.ts',
    'src/**/*.stories.ts',
    'src/**/*.styles.ts',
  ],
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [
    cemSorterPlugin(),
    typeParserPlugin(),
    cemInheritancePlugin(),
    cemDeprecatorPlugin({
      hideLogs: true,
    }),

    customElementVsCodePlugin({
      hideLogs: true,
    }),
    customElementJetBrainsPlugin({
      hideLogs: true,
    }),
    customElementReactWrapperPlugin({
      hideLogs: true,
      outdir: 'react',
      exclude: ['WcDoxBase'],
      modulePath: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),
    customElementSolidJsPlugin({
      hideLogs: true,
      outdir: 'types',
      fileName: 'custom-element-solidjs.d.ts',
      modulePath: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),
    jsxTypesPlugin({
      outdir: 'types',
      modulePath: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),
    customElementVuejsPlugin({
      hideLogs: true,
      outdir: 'types',
      fileName: 'custom-element-vuejs.d.ts',
      modulePath: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),
    customElementSveltePlugin({
      hideLogs: true,
      outdir: 'types',
      fileName: 'custom-element-svelte.d.ts',
      modulePath: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),
    lazyLoaderPlugin({
      outdir: 'cdn',
      importPathTemplate: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),

    jsDocTagsPlugin({
      tags: {
        status: {},
        since: {},
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
      },
    }),
  ],

  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program
      .getSourceFiles()
      .filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
};
