import styles from './methods.styles.js';
import { config, manifest, MethodsElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';
import { getComponent, getComponentMethods } from '../../utils/cem-tools.js';

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
  schema.ClassMethod
> {
  public constructor() {
    super();
    this.config = config.methods;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData();
  }

  protected override updateMetaData(): void {
    if (!this.metaData) {
      const component = getComponent(manifest, this.componentName, this.tag);
      const methods = getComponentMethods(component);
      this.metaData = methods as schema.ClassMethod[];
    }
  }

  override render() {
    return this.getRenderTemplate(styles, 'methods');
  }
}

export default WcMethods;
