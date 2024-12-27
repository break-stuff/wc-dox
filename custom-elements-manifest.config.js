import { getTsProgram, expandTypesPlugin } from 'cem-plugin-expanded-types';
import { customElementReactWrapperPlugin } from 'custom-element-react-wrappers';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';
import { customElementSolidJsPlugin } from 'custom-element-solidjs-integration';
import { customElementJsxPlugin } from 'custom-element-jsx-integration';
import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
import { customElementSveltePlugin } from 'custom-element-svelte-integration';
import { cemInheritancePlugin } from 'custom-elements-manifest-inheritance';
import { customElementLazyLoaderPlugin } from 'custom-element-lazy-loader';
import { customJSDocTagsPlugin } from 'cem-plugin-custom-jsdoc-tags';
import { customEsLintRuleGeneratorPlugin } from 'custom-element-eslint-rule-generator';
import { cemDeprecatorPlugin } from 'custom-elements-manifest-deprecator';

const getTagBase = tagName => tagName.split('-').slice(1).join('-');

export default {
  /** Globs to analyze */
  globs: ['src/components/**/*.ts'],
  /** Globs to exclude */
  exclude: [
    'src/**/*.test.ts',
    'src/**/*.stories.ts',
    'src/**/*.styles.ts',
    'src/**/dox-base.ts',
  ],
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [
    expandTypesPlugin({
      hideLogs: true,
    }),
    cemInheritancePlugin({
      hideLogs: true,
    }),
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
    customElementJsxPlugin({
      hideLogs: true,
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
    customElementLazyLoaderPlugin({
      hideLogs: true,
      outdir: 'cdn',
      importPathTemplate: (_, tagName) =>
        `../dist/components/${getTagBase(tagName)}/${getTagBase(tagName)}.js`,
    }),

    customJSDocTagsPlugin({
      hideLogs: true,
      tags: {
        status: {},
        since: {},
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
      },
    }),

    customEsLintRuleGeneratorPlugin({
      hideLogs: true,
      outdir: 'eslint',
    }),
  ],

  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program
      .getSourceFiles()
      .filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
};
