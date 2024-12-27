import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcDox } from './dox.js';

describe('MyWcDox', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcDox>(html`<wc-dox></wc-dox>`);
      await expect(el).to.be.accessible();
    });
  });
});
