import { DoxConfig } from './types';
import { markdownToHtml } from '../utils/markdown.js';

export const defaultDoxConfig: DoxConfig = {
  hideOnEmpty: true,
  headingLevel: 3,
  dox: {
    apiOrder: [
      'imports',
      'props',
      'slots',
      'methods',
      'events',
      'css-props',
      'css-parts',
      'css-states',
    ],
  },
  imports: {
    heading: 'Imports',
    headingId: 'imports',
    description: 'You can import the component in the following ways:',
    imports: [
      {
        label: 'HTML',
        lang: 'html',
        importTemplate: (tagName, className) =>
          `<script type="module" src="https://cdn.jsdelivr.net/npm/my-library/dist/${tagName}/${className}.js"></script>`,
      },
      {
        label: 'NPM',
        lang: 'js',
        importTemplate: (tagName, className) =>
          `import 'my-library/dist/${tagName}/${className}.js';`,
      },
      {
        label: 'React',
        lang: 'js',
        importTemplate: tagName =>
          `import 'my-library/react/${tagName}/index.js';`,
      },
    ],
  },
  cssParts: {
    heading: 'CSS Parts',
    headingId: 'css-parts',
    description:
      'The following [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) are available to customize the component:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: cssPart =>
      `<tr>
        <td><p><code>${cssPart.name}</code></p></td>
        <td>${markdownToHtml(cssPart.description || '')}</td>
        <td style="text-align: center;">${cssPart.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  cssProps: {
    heading: 'CSS Custom Properties',
    headingId: 'css-props',
    description:
      'You can use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to customize the look and feel of the component using the following properties:',
    headings: ['Name', 'Default', 'Description', 'Deprecated'],
    rowTemplate: cssVar =>
      `<tr>
        <td><p><code>${cssVar.name}</code></p></td>
        <td><p><code>${cssVar.default}</code></p></td>
        <td>${markdownToHtml(cssVar.description || '')}</td>
        <td style="text-align: center;">${cssVar.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  events: {
    heading: 'Events',
    headingId: 'events',
    description:
      'The following [events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) are emitted by the component:',
    headings: ['Name', 'Type', 'Description', 'Deprecated'],
    rowTemplate: event =>
      `<tr>
        <td><p><code>${event.name}</code></p></td>
        <td><p><code>${event.type.text === 'CustomEvent' ? 'CustomEvent' : `CustomEvent&lt;${event.type.text}&gt;`}</code></p></td>
        <td>${markdownToHtml(event.description || '')}</td>
        <td style="text-align: center;">${event.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  methods: {
    heading: 'Methods',
    headingId: 'methods',
    description: 'The following CSS parts are available:',
    headings: ['Name', 'Description', 'Type', 'Deprecated'],
    rowTemplate: method =>
      `<tr>
        <td><p><code>${method.name}</code></p></td>
        <td>${markdownToHtml(method.description || '')}</td>
        <td><p><code>(${method.parameters?.map(p => `${p.name + (p.type?.text ? `: ${p.type?.text}` : '')}`).join(', ') || ''}) => ${method.return?.type?.text || 'void'}</code></p></td>
        <td style="text-align: center;">${method.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  props: {
    heading: 'Attributes and Properties',
    headingId: 'props',
    description: 'The following Properties and Attributes are available:',
    headings: [
      'Name',
      'Attribute',
      'Description',
      'Type',
      'Default',
      'Read-only',
      'Deprecated',
    ],
    rowTemplate: prop =>
      `<tr>
        <td><p><code>${prop.name}</code></p></td>
        <td><p><code>${prop.attribute || ''}</code></p></td>
        <td>${markdownToHtml(prop.description || '')}</td>
        <td><p><code>${prop.type?.text || ''}</code></p></td>
        <td><p><code>${prop.default}</code></p></td>
        <td style="text-align: center;">${prop.readonly ? '✔️' : ''}</td>
        <td style="text-align: center;">${prop.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  slots: {
    heading: 'Slots',
    headingId: 'slots',
    description: 'The following slots are available:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: slot =>
      `<tr>
        <td><p><code>${slot.name || '<em>(default)</em>'}</code></p></td>
        <td>${markdownToHtml(slot.description || '')}</td>
        <td style="text-align: center;">${slot.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  cssStates: {
    heading: 'CSS States',
    headingId: 'css-states',
    description:
      'The following [CSS states](https://developer.mozilla.org/en-US/docs/Web/CSS/:state) can be used to customize component styles:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: state =>
      `<tr>
        <td><p><code>${state.name}</code></p></td>
        <td>${markdownToHtml(state.description || '')}</td>
        <td style="text-align: center;">${state.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
};
