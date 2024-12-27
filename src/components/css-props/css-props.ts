import styles from './css-props.styles.js';
import { config, CssPropsElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * Add a description here
 *
 * @tag wc-css-props
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcCssProps extends WcDoxBase<
  CssPropsElementConfig,
  schema.CssCustomProperty
> {
  public constructor() {
    super();
    this.config = config.cssProps;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('cssProperties');
  }

  override render() {
    return this.getRenderTemplate(styles, 'css-props');
  }
}

export default WcCssProps;
