import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography, { TypographyProps } from './index';

const meta: Meta<TypographyProps> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'text-medium-16-100',
        'text-medium-14-100-gray',
        'text-normal-14-100-black',
        'text-normal-14-100-gray',
        'text-semibold-18-100-black',
        'text-normal-12-100-gray',
        'text-normal-14-28-black',
        'text-medium-16-100-gray',
        'text-normal-14-100-red',
        'text-medium-18-100',
        'text-medium-16-170',
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
    variant: 'text-normal-14-100-red',
    as: 'p',
  },
};
