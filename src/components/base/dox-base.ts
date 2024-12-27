import { CSSResult, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseElementConfig, manifest } from '../../configs/index.js';
import * as schema from 'custom-elements-manifest/schema';
import { getComponent } from '../../utils/cem-tools.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { markdownToHtml } from '../../utils/markdown.js';
import { config } from '../../configs/index.js';

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

  @property()
  tag?: string;

  @property({ attribute: 'component-class' })
  componentName?: string;

  @state()
  protected metaData?: MetaData[];

  protected updateMetaData(feature: keyof schema.CustomElement): void {
    const component = getComponent(manifest, this.componentName, this.tag);
    this.metaData = component?.[feature] as MetaData[];

    if (config.hideOnEmpty && !this.metaData?.length) {
      this.hidden = true;
    }
  }

  protected getRenderTemplate(styles: CSSResult, className: string) {
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
        <h3 class="heading">
          ${this.config?.heading}
          <a href="#${this.config?.headingId}" class="skip-link">#</a>
        </h3>
        ${this.config?.description
          ? unsafeHTML(markdownToHtml(this.config.description))
          : ''}
        <div class="table-wrapper">
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
