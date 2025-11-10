export * from './configs/index.js';
export { markdownToHtml } from './utils/markdown.js';
import WcDox from './components/dox/dox.js';
import WcImports from './components/imports/imports.js';
import WcCssParts from './components/css-parts/css-parts.js';
import WcCssProps from './components/css-props/css-props.js';
import WcEvents from './components/events/events.js';
import WcProps from './components/props/props.js';
import WcMethods from './components/methods/methods.js';
import WcSlots from './components/slots/slots.js';
import WcCssStates from './components/css-states/css-states.js';
import { define } from './utils/define.js';

try {
  define('wc-dox', WcDox);
  define('wc-imports', WcImports);
  define('wc-css-parts', WcCssParts);
  define('wc-css-props', WcCssProps);
  define('wc-events', WcEvents);
  define('wc-props', WcProps);
  define('wc-methods', WcMethods);
  define('wc-slots', WcSlots);
  define('wc-css-states', WcCssStates);
} catch (e) {
  console.error(e);
}
