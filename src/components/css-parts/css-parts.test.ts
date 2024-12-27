import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcCssParts } from './css-parts.js';

describe('WcCssParts', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcCssParts>(html`<wc-css-parts></wc-css-parts>`);
      await expect(el).to.be.accessible();
    });
  });
});
