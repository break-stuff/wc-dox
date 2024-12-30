import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcStates } from './css-states.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-states');

export default {
  title: 'Components/States',
  component: 'wc-states',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcStates & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {},
};
