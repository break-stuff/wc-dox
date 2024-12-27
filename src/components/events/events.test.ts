import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcEvents } from './events.js';

describe('WcEvents', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcEvents>(html`<wc-events></wc-events>`);
      await expect(el).to.be.accessible();
    });
  });
});
