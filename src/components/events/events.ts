import styles from './events.styles.js';
import { EventsElementConfig } from '../../configs/types.js';
import * as schema from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';
import { config } from '../../configs/index.js';

/**
 * This component provides a list of the component's events and their status
 *
 * @tag wc-events
 * @since 0.0.0
 * @status experimental
 *
 **/
export class WcEvents extends WcDoxBase<
  EventsElementConfig,
  schema.Event
> {
  public constructor() {
    super();
    this.config = config.events;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('events');
  }

  override render() {
    return this.getRenderTemplate(styles, 'events');
  }
}

export default WcEvents;
