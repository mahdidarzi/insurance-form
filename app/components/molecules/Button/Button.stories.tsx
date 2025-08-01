import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from '.';

const meta: Meta<ButtonProps> = {
  title: 'Molecules/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'outline-filled',
        'cta',
        'minimal',
      ],
    },
    disabled: {
      control: 'boolean',
    },
    className: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: 'text',
      defaultValue: 'Click Me',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Primary (Disabled)',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
    children: 'Secondary (Disabled)',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const OutlineFilled: Story = {
  args: {
    variant: 'outline-filled',
    children: 'Outline Filled',
  },
};

export const CTA: Story = {
  args: {
    variant: 'cta',
    children: 'Call to Action',
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: 'Minimal',
  },
};

export const MinimalDisabled: Story = {
  args: {
    variant: 'minimal',
    disabled: true,
    children: 'Minimal (Disabled)',
  },
};
