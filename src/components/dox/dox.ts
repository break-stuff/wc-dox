import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './dox.styles.js';
import { config } from '../../configs/index.js';
import WcDoxBase from '../base/dox-base.js';

/**
 * Add a description here
 *
 * @tag wc-dox
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcDox extends LitElement {
  override createRenderRoot() {
    return this;
  }

  @property()
  tag?: string;

  @property({ attribute: 'component-class' })
  componentName?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.tag || this.componentName) {
      config.dox?.apiOrder?.forEach(importName => {
        const component = document.createElement(
          `wc-${importName}`,
        ) as WcDoxBase<never, unknown>;
        component.tag = this.tag;
        component.componentName = this.componentName;
        this.appendChild(component);
      });
    }
  }

  override render() {
    return html`
      <style>
        ${styles}
      </style>
    `;
  }
}

export default WcDox;
