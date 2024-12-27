import styles from './slots.styles.js';
import { config, CssPropsElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';


/**
 * Add a description here
 *
 * @tag wc-slots
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcSlots extends WcDoxBase<
  CssPropsElementConfig,
  schema.CssCustomProperty
> {
  public constructor() {
    super();
    this.config = config.slots;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('slots');
  }

  override render() {
    return this.getRenderTemplate(styles, 'slots');
  }
}

export default WcSlots;
