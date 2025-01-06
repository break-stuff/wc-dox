import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import { setWcStorybookHelpersConfig } from 'wc-storybook-helpers';
import { withActions } from '@storybook/addon-actions/decorator';
import './code-bubble-setup.js';
import './styles.css';
import { setWcDoxConfig } from '../public/html/index.js';
import manifest from './custom-elements.json';

import type { Preview } from '@storybook/web-components';

setWcStorybookHelpersConfig({ typeRef: 'expandedType' });
setCustomElementsManifest(customElements);
setWcDoxConfig(manifest, {
  imports: {
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
});

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true, // provides descriptions and additional info for controls
      sort: 'alpha', // sorts controls in alphabetical order
    },
  },
  decorators: [withActions],
};

export default preview;
