import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcEvents } from './events.js';

const { args, argTypes, events, template } = getWcStorybookHelpers('wc-events');

export default {
  title: 'Components/Events',
  component: 'wc-events',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcEvents & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {
    tag: 'my-element',
    'component-name': 'MyElement',
  },
};
