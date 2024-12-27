import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcCssProps } from './css-props.js';

const { args, argTypes, events, template } =
  getWcStorybookHelpers('wc-css-props');

export default {
  title: 'Components/CSS Props',
  component: 'wc-css-props',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcCssProps & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {
    tag: 'my-element',
    'component-name': 'MyElement',
  },
};
