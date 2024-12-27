import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcSlots } from './slots.js';

describe('WcSlots', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcSlots>(html`<wc-slots></wc-slots>`);
      await expect(el).to.be.accessible();
    });
  });
});
