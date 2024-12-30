import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcStates } from './css-states.js';

describe('WcStates', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcStates>(html`<wc-states></wc-states>`);
      await expect(el).to.be.accessible();
    });
  });
});
