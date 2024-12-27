import { StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { WcImports } from './imports.js';

const { args, argTypes, events, template } =
  getWcStorybookHelpers('wc-imports');

export default {
  title: 'Components/Imports',
  component: 'wc-imports',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

type Story = StoryObj<WcImports & typeof args>;

export const Default: Story = {
  render: args => template(args),
  args: {
    tag: 'my-element',
    'component-name': 'MyElement',
  },
};
