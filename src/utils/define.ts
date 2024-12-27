export function define<T extends HTMLElement>(
  tag: string,
  constructor: new () => T,
) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
