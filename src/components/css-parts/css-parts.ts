import { CssPartsElementConfig } from '../../configs/types.js';
import { config } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import { WcDoxBase } from '../base/dox-base.js';
import styles from './css-parts.styles.js';

/**
 * Add a description here
 *
 * @tag wc-css-parts
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcCssParts extends WcDoxBase<CssPartsElementConfig, schema.CssPart> {
  public constructor() {
    super();
    this.config = config.cssParts;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('cssParts');
  }

  override render() {
    return this.getRenderTemplate(styles, 'css-parts');
  }
}

export default WcCssParts;
