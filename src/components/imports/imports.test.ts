import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcImports } from './imports.js';

describe('WcImports', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcImports>(html`<wc-imports></wc-imports>`);
      await expect(el).to.be.accessible();
    });
  });
});
