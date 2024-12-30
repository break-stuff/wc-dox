import styles from './css-props.styles.js';
import { config, CssPropsElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * A component to document the CSS custom properties of a custom element
 *
 * @tag wc-css-props
 * @since 1.0.0
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
