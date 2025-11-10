import styles from './css-states.styles.js';
import { config, CssStatesElementConfig } from '../../configs/index.js';
import * as cem from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * A component to document the CSS custom states of a custom element
 *
 * @tag wc-css-states
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcCssStates extends WcDoxBase<
CssStatesElementConfig,
  cem.CssCustomState
> {
  public constructor() {
    super();
    this.feature = 'cssStates';
    this.config = config.cssStates;
  }

  override render() {
    return this.getRenderTemplate(styles, 'states');
  }
}

export default WcCssStates;
