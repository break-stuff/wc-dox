import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcCssParts } from './css-parts.js';

const { args, argTypes, events, template } =
  getWcStorybookHelpers('wc-css-parts');

export default {
  title: 'Components/CSS Parts',
  component: 'wc-css-parts',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcCssParts & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {
    tag: 'my-element',
    'component-name': 'MyElement',
  },
};
