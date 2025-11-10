/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cem from 'custom-elements-manifest/schema';

export type DoxConfig = {
  /** Hides a section of the documentation if it has no content */
  hideOnEmpty?: boolean;
  /** Configures the heading level for the API sections - default is 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Configures the `wc-dox` component contents */
  dox?: DoxElementConfig;
  /** Configures the `wc-imports` component contents */
  imports?: ImportsElementConfig;
  /** Configures the `wc-css-parts` component contents */
  cssParts?: CssPartsElementConfig;
  /** Configures the `wc-css-props` component contents */
  cssProps?: CssPropsElementConfig;
  /** Configures the `wc-events` component contents */
  events?: EventsElementConfig;
  /** Configures the `wc-methods` component contents */
  methods?: MethodsElementConfig;
  /** Configures the `wc-props` component contents */
  props?: PropsElementConfig;
  /** Configures the `wc-slots` component contents */
  slots?: SlotsElementConfig;
  /** Configures the `wc-css-states` component contents */
  cssStates?: CssStatesElementConfig;
};

export type DoxElementConfig = {
  /** Controls the order in which the API documentation sections are displayed */
  apiOrder?: Array<
    | 'imports'
    | 'props'
    | 'slots'
    | 'methods'
    | 'events'
    | 'css-props'
    | 'css-parts'
    | 'css-states'
  >;
};

export type ImportsElementConfig = {
  /** The heading for the imports section */
  heading?: string;
  /** The ID used for the skip-link */
  headingId?: string;
  /** The description for the imports section */
  description?: string;
  /** The copy button icon */
  copyIcon?: string;
  /** The copy button label */
  copyLabel?: string;
  /** The icon displayed when the content is copied */
  copiedIcon?: string;
  /** The label used when the content is copied */
  copiedLabel?: string;
  /** Sets the language class on `pre` tag instead of `code` tag */
  langOnPreTag?: boolean;
  /** The list of import options */
  imports?: ImportConfig[];
};

export type ImportConfig = {
  /** The text displayed in the tab option */
  label?: string;
  /** The language the code - `html`, `js`, `ts`, etc. */
  lang?: string;
  /** An additional description that is specific to this import */
  description?: string;
  /**
   * Use this function to specify import information for a given language. The tag and class names can be used to create dynamic component-specific import paths.
   * @param tagName The tag name specified using the @tag or @tagName in the component's jsDoc
   * @param className The JS class name for the component
   * @returns string
   */
  importTemplate?: (tagName: string, className: string) => string;
};

export type BaseElementConfig<T> = {
  /** The heading for the section */
  heading?: string;
  /** The ID used for the skip-link */
  headingId?: string;
  /** The label used for the skip-link */
  skipLinkLabel?: string;
  /** The description for the section */
  headings?: string[];
  /** The description for the section */
  description?: string;
  /** The table row template for the section */
  rowTemplate?: (x: T) => string;
};


export type CssPart = cem.CssPart & Record<string, any>;
export type CssProp = cem.CssCustomProperty & Record<string, any>;
export type Event = cem.Event & Record<string, any>;
export type Method = cem.ClassMethod & Record<string, any>;
export type Property = cem.CustomElementField & Record<string, any>;
export type Slot = cem.Slot & Record<string, any>;
export type CssState = cem.CssCustomState & Record<string, any>;

export type CssPartsElementConfig = BaseElementConfig<CssPart>;
export type CssPropsElementConfig =
  BaseElementConfig<CssProp>;
export type EventsElementConfig = BaseElementConfig<Event>;
export type MethodsElementConfig = BaseElementConfig<Method>;
export type PropsElementConfig =
  BaseElementConfig<Property>;
export type SlotsElementConfig = BaseElementConfig<Slot>;
export type CssStatesElementConfig = BaseElementConfig<CssState>;
