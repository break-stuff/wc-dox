import styles from './states.styles.js';
import { config, StatesElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * Add a description here
 *
 * @tag wc-states
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcStates extends WcDoxBase<
StatesElementConfig,
  schema.CssCustomState
> {
  public constructor() {
    super();
    this.config = config.states;
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
