import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcProps } from './props.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-props');

export default {
  title: 'Components/Props',
  component: 'wc-props',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcProps & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {},
};
