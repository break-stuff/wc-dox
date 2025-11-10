import { CSSResult, LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { property, state } from 'lit/decorators.js';
import { BaseElementConfig, manifest } from '../../configs/index.js';
import * as cem from 'custom-elements-manifest/schema';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { markdownToHtml } from '../../utils/markdown.js';
import { config } from '../../configs/index.js';
import { getComponentByClassName, getComponentPublicProperties, getComponentByTagName, Component, getComponentPublicMethods } from '@wc-toolkit/cem-utilities';

export type ComponentAPI = keyof cem.CustomElement | 'properties' | 'methods';

/**
 * This base class is to isolate reusable code for the dox components.
 **/
export class WcDoxBase<
  Config extends BaseElementConfig<never>,
  MetaData,
> extends LitElement {
  override createRenderRoot() {
    return this;
  }

  protected config?: Config;
  protected component?: Component;
  protected feature?: ComponentAPI;

  /** The tag name of the custom element */
  @property()
  public tag?: string;

  /** The name of the component class */
  @property({ attribute: 'component-class' })
  public componentName?: string;

  @state()
  protected metaData?: MetaData[];

  override connectedCallback(): void {
    super.connectedCallback();
    this.component = getComponentByTagName(manifest, this.tag) || getComponentByClassName(manifest, this.componentName);
    this.updateMetaData(this.feature); // default to empty string if feature is undefined
  }

  protected updateMetaData(feature?: ComponentAPI): void {
    if(!this.component) {
      console.warn(`[wc-dox] No component defined to extract metadata from for tag "${this.tag}" or class "${this.componentName}" in "${this.tagName.toLowerCase()}".`);
      this.metaData = [];
      this.updateVisibility();
      return;
    }

    if(!feature) {
      console.warn(`[wc-dox] No feature defined to extract metadata from in "${this.tagName.toLowerCase()}".`);
      this.metaData = [];
      this.updateVisibility();
      return;
    }

    if(feature === 'properties') {
      this.metaData = getComponentPublicProperties(this.component) as MetaData[];
      this.updateVisibility();
      return;
    }

    if(feature === 'methods') {
      this.metaData = getComponentPublicMethods(this.component) as MetaData[];
      this.updateVisibility();
      return;
    }

    this.metaData = this.component?.[feature] as MetaData[];

    this.updateVisibility();
  }

  protected updateVisibility(): void {
    if (config.hideOnEmpty && !this.metaData?.length) {
      this.hidden = true;
    }
  }

  protected getRenderTemplate(styles: CSSResult, className: string) {
    const heading = `h${config.headingLevel || 3}`;
    return html`
      <style>
        ${this.tagName.toLowerCase()} {
          display: block;

          &[hidden] {
            display: none !important;
          }     

          .table-wrapper {
            overflow-x: auto;

            table {
              min-width: 100%;
            }
          }
        }
        ${styles}
      </style>
      <div class="${className}">
        <${unsafeStatic(heading)} class="heading ${config?.headingClass || ''}">
          ${this.config?.heading}
          <a href="#${this.config?.headingId}" class="skip-link" aria-label="${ifDefined(this.config?.skipLinkLabel)}">#</a>
        </${unsafeStatic(heading)}>
        ${
          this.config?.description
            ? unsafeHTML(markdownToHtml(this.config.description))
            : ''
        }
        <div class="table-wrapper ${config?.tableClass || ''}">
          <table>
            <thead>
              <tr>
                ${this.config?.headings?.map(x => html`<th>${x}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${unsafeHTML(
                this.metaData
                  ?.map(x => this.config?.rowTemplate?.(x as never))
                  .join('\n') || '',
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

export default WcDoxBase;
