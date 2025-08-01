import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography, { TypographyProps } from './index';

const meta: Meta<TypographyProps> = {
  title: 'Atomic/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'tex-medium-16-100',
        'tex-medium-14-100-gray',
        'tex-normal-14-100-black',
        'tex-normal-14-100-gray',
        'tex-semibold-18-100-black',
        'tex-normal-12-100-gray',
        'tex-normal-14-28-black',
        'tex-medium-16-100-gray',
        'tex-normal-14-100-red',
        'tex-medium-18-100',
        'tex-medium-16-170',
      ],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
    },
    className: { control: false },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<TypographyProps>;

export const Default: Story = {
  args: {
    children: 'Hello Typography!',
    variant: 'text-medium-16-100',
    as: 'p',
  },
};
