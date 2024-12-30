import styles from './props.styles.js';
import { config, manifest, PropsElementConfig } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';
import { getComponent, getComponentProperties } from '../../utils/cem-tools.js';

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
  schema.CustomElementField
> {
  public constructor() {
    super();
    this.config = config.props;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData();
  }

  protected override updateMetaData(): void {
    if (!this.metaData) {
      const component = getComponent(manifest, this.componentName, this.tag);
      const methods = getComponentProperties(component);
      this.metaData = methods as schema.CustomElementField[];
    }
  }

  override render() {
    return this.getRenderTemplate(styles, 'props');
  }
}

export default WcProps;
