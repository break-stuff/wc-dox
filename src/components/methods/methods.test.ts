import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcMethods } from './methods.js';

describe('WcMethods', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcMethods>(html`<wc-methods></wc-methods>`);
      await expect(el).to.be.accessible();
    });
  });
});
