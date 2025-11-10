import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcMethods } from './methods.js';

const { args, argTypes, events, template } =
  getWcStorybookHelpers('wc-methods');

export default {
  title: 'Components/Methods',
  component: 'wc-methods',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcMethods & typeof args>;

export const Default: Story = {
  render: args => template(args),
    args: {
    tag: 'my-element',
  },
};
