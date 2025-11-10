import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcCssStates } from './css-states.js';

describe('WcCssStates', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcCssStates>(html`<wc-css-states></wc-css-states>`);
      await expect(el).to.be.accessible();
    });
  });
});
