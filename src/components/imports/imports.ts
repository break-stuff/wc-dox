import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './imports.styles.js';
import { ImportsElementConfig } from '../../configs/types.js';
import { config } from '../../configs/index.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { markdownToHtml } from '../../utils/markdown.js';
import { html, unsafeStatic } from 'lit/static-html.js';

let importId = 0;

/**
 * A component to document the ways to import a custom element
 *
 * @tag wc-imports
 * @since 1.0.0
 * @status experimental
 *
 * @cssprop [--wc-imports-border-color=#e0e0e0] - Controls the color of the divider between the tabs and tab content
 * @cssprop [--wc-imports-active-border-color=#0078d4] - The bottom border color of the selected tab
 * @cssprop [--wc-imports-border-size=2px] - the size of the border divider between the tabs and the tab content
 **/
export class WcImports extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    importId++;

    if (config.hideOnEmpty && !this.config?.imports?.length) {
      this.hidden = true;
    }
  }

  @property()
  tag?: string;

  @property({ attribute: 'component-class' })
  componentClass?: string;

  @state()
  private config?: ImportsElementConfig;

  @state()
  private selectedImport = 0;

  @state()
  copied = false;

  public constructor() {
    super();
    this.config = config.imports;
  }

  private handleTabClick(i: number) {
    this.selectedImport = i;
  }

  private handleCopyClick(content: string) {
    this.copied = true;
    navigator.clipboard.writeText(content);

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  override render() {
    const heading = `h${config.headingLevel || 3}`;

    return html`
      <style>
        ${styles}
      </style>
      <div class="imports">
        <${unsafeStatic(heading)} class="heading">
          ${this.config?.heading}
          <a href="#${this.config?.headingId}" class="skip-link">#</a>
        </${unsafeStatic(heading)}>
        ${
          this.config?.description
            ? unsafeHTML(markdownToHtml(this.config.description))
            : ''
        }
        <div
          role="tablist"
          aria-labelledby="imports-${importId}"
          class="tablist"
        >
          ${this.config?.imports?.map(
            (x, i) =>
              html`<button
                id="tab-${importId}-${i}"
                class="tab"
                type="button"
                role="tab"
                aria-selected="${this.selectedImport === i}"
                aria-controls="tabpanel-${importId}-${i}"
                @click=${() => this.handleTabClick(i)}
              >
                ${x.label}
              </button>`,
          )}
        </div>

        ${this.config?.imports?.map((x, i) => {
          const content =
            x.importTemplate?.(this.tag ?? '', this.componentClass ?? '') || '';
          return html`<div
            id="tabpanel-${importId}${i}"
            class="tabpanel"
            role="tabpanel"
            aria-labelledby="tab-${importId}-${i}"
            ?hidden="${this.selectedImport !== i}"
          >
            <pre>
              <code class="language-${x.lang}">${content}</code>
            </pre>
            <button
              class="copy-button"
              aria-label="${(this.copied
                ? this.config?.copiedLabel
                : this.config?.copyLabel) || ''}"
              @click=${() => this.handleCopyClick(content)}
            >
              ${unsafeSVG(
                (this.copied
                  ? this.config?.copiedIcon
                  : this.config?.copyIcon) || '',
              )}
            </button>
          </div>`;
        })}
      </div>
    `;
  }
}

export default WcImports;
