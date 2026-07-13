import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AuthLayout>;
export const Default: Story = { args: { title: 'Sign in', children: <div>Form goes here</div> } };
