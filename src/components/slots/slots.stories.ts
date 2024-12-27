import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcSlots } from './slots.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-slots');

export default {
  title: 'Components/Slots',
  component: 'wc-slots',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcSlots & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {},
};
