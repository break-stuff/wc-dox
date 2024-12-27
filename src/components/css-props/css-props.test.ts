import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { WcCssProps } from './css-props.js';

describe('WcCssProps', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<WcCssProps>(html`<wc-css-props></wc-css-props>`);
      await expect(el).to.be.accessible();
    });
  });
});
