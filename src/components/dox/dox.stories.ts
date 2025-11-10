import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcDox } from './dox.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-dox');

export default {
  title: 'Components/Dox',
  component: 'wc-dox',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcDox & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {
    tag: 'my-element',
  },
};
