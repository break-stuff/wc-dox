import styles from './methods.styles.js';
import { config, MethodsElementConfig } from '../../configs/index.js';
import * as cem from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';

/**
 * A component to document the methods of a custom element
 *
 * @tag wc-methods
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcMethods extends WcDoxBase<
  MethodsElementConfig,
  cem.ClassMethod
> {
  public constructor() {
    super();
    this.feature = 'methods';
    this.config = config.methods;
  }

  override render() {
    return this.getRenderTemplate(styles, 'methods');
  }
}

export default WcMethods;
