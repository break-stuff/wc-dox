import * as schema from 'custom-elements-manifest/schema';

export type DoxConfig = {
  /** Hides a section of the documentation if it has no content */
  hideOnEmpty?: boolean;
  /** Configures the heading level for the API sections */
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
  /** Configures the `wc-states` component contents */
  states?: StatesElementConfig;
};

export type DoxElementConfig = {
  /** Controls the order in which the API documentation is displayed */
  apiOrder?: Array<
    | 'imports'
    | 'props'
    | 'slots'
    | 'methods'
    | 'events'
    | 'css-props'
    | 'css-parts'
    | 'states'
  >;
};

export type ImportsElementConfig = {
  /** The heading for the imports section */
  heading?: string;
  /** The ID used for the skip-link */
  headingId?: string;
  /** The description for the imports section */
  description?: string;
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
  /** The description for the section */
  headings?: string[];
  /** The description for the section */
  description?: string;
  /** The table row template for the section */
  rowTemplate?: (x: T) => string;
};


export type CssPart = schema.CssPart;
export type CssProp = schema.CssCustomProperty;
export type Event = schema.Event;
export type Method = schema.ClassMethod;
export type Property = schema.CustomElementField;
export type Slot = schema.Slot;
export type State = schema.CssCustomState;

export type CssPartsElementConfig = BaseElementConfig<CssPart> & {};
export type CssPropsElementConfig =
  BaseElementConfig<CssProp> & {};
export type EventsElementConfig = BaseElementConfig<Event> & {};
export type MethodsElementConfig = BaseElementConfig<Method> & {};
export type PropsElementConfig =
  BaseElementConfig<Property> & {};
export type SlotsElementConfig = BaseElementConfig<Slot> & {};
export type StatesElementConfig = BaseElementConfig<State> & {};
