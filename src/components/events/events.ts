import styles from './events.styles.js';
import { EventsElementConfig } from '../../configs/types.js';
import * as cem from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';
import { config } from '../../configs/index.js';

/**
 * A component to document the events of a custom element
 *
 * @tag wc-events
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcEvents extends WcDoxBase<
  EventsElementConfig,
  cem.Event
> {
  public constructor() {
    super();
    this.feature = 'events';
    this.config = config.events;
  }

  override render() {
    return this.getRenderTemplate(styles, 'events');
  }
}

export default WcEvents;
