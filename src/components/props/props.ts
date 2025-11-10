import styles from './props.styles.js';
import { config, PropsElementConfig } from '../../configs/index.js';
import * as cem from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * A component to document the attributes and properties of a custom element
 *
 * @tag wc-props
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcProps extends WcDoxBase<
  PropsElementConfig,
  cem.CustomElementField
> {
  public constructor() {
    super();
    this.feature = 'properties';
    this.config = config.props;
  }

  override render() {
    return this.getRenderTemplate(styles, 'props');
  }
}

export default WcProps;
