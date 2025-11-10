import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcCssStates } from './css-states.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-css-states');

export default {
  title: 'Components/CSS States',
  component: 'wc-css-states',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcCssStates & typeof args>;

export const Default: Story = {
  render: args => template(args),
    args: {
    tag: 'my-element',
  },
};
