import type * as cem from 'custom-elements-manifest';

/**
 * Gets a list of components from a CEM object
 * @param customElementsManifest CEM object
 * @param exclude and array of component names to exclude
 * @returns Component[]
 */
export function getComponent(
  customElementsManifest: cem.cem,
  className?: string,
  tagName?: string,
) {
  return (
    customElementsManifest.modules?.map(
      mod =>
        mod?.declarations?.find(
          dec =>
            ((dec as cem.CustomElement).name === className ||
              (dec as cem.CustomElement).tagName === tagName),
        ),
    )
  )[0] as cem.CustomElement;
}

/**
 * Gets a list of public properties from a CEM component
 * @param component CEM component/declaration object
 * @returns an array of public properties for a given component
 */
export function getComponentProperties(component: cem.CustomElement) {
  return component.members?.filter(
    member =>
      member.kind === 'field' &&
      member.privacy !== 'private' &&
      member.privacy !== 'protected' &&
      !member.static &&
      !member.name.startsWith('#'),
  ) as cem.ClassMember[];
}

/**
 * Get all public methods for a component
 * @param component CEM component/declaration object
 * @returns ClassMethod[]
 */
export function getComponentMethods(
  component: cem.CustomElement,
): cem.ClassMethod[] {
  return component.members?.filter(
    member =>
      member.kind === 'method' &&
      member.privacy !== 'private' &&
      member.privacy !== 'protected' &&
      !member.name.startsWith('#'),
  ) as cem.ClassMethod[];
}

/**
 * Gets a list of event names for a given component
 * @param component The component you want to get the event types for
 * @param excludedTypes Any types you want to exclude from the list
 * @returns A string array of event types for a given component
 */
export function getCustomEventTypes(component: cem.CustomElement) {
  const types = component.events
    ?.map(e => {
      const eventType = e.type?.text
        .replace('[]', '')
        .replace(' | undefined', '');
      return eventType &&
        !eventType.includes('<') &&
        !eventType.includes(`{`) &&
        !eventType.includes("'") &&
        !eventType.includes(`"`)
        ? eventType
        : undefined;
    })
    .filter(e => e !== undefined && !e?.startsWith('HTML'));

  return types?.length ? [...new Set(types)].join(', ') : undefined;
}
