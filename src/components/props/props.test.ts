import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcProps } from './props.js';

describe('WcProps', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcProps>(html`<wc-props></wc-props>`);
      await expect(el).to.be.accessible();
    });
  });
});
