import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './dox.styles.js';
import { config, manifest } from '../../configs/index.js';
import WcDoxBase from '../base/dox-base.js';
import {
  Component,
  getComponentByClassName,
  getComponentByTagName,
} from '@wc-toolkit/cem-utilities';

/**
 * A component to document the APIs of a custom element
 *
 * @tag wc-dox
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcDox extends LitElement {
  override createRenderRoot() {
    return this;
  }

  protected component?: Component;

  @property()
  tag?: string;

  @property({ attribute: 'component-name' })
  componentName?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.component = this.tag
      ? getComponentByTagName(manifest, this.tag)
      : getComponentByClassName(manifest, this.componentName);
    if (this.component) {
      config.dox?.apiOrder?.forEach(importName => {
        const component = document.createElement(
          `wc-${importName}`,
        ) as WcDoxBase<never, unknown>;
        component.component = this.component;
        this.appendChild(component);
      });
    } else {
      console.warn(
        `[wc-dox] No component defined to extract metadata from for tag "${this.tag}" or class "${this.componentName}" in "${this.tagName.toLowerCase()}".`,
      );
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
