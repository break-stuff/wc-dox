import styles from './css-states.styles.js';
import { config, CssStatesElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * A component to document the CSS custom states of a custom element
 *
 * @tag wc-states
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcStates extends WcDoxBase<
CssStatesElementConfig,
  schema.CssCustomState
> {
  public constructor() {
    super();
    this.config = config.cssStates;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('cssStates');
  }

  override render() {
    return this.getRenderTemplate(styles, 'states');
  }
}

export default WcStates;
