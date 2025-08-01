import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Loading, { LoadingProps } from './';

const meta: Meta<LoadingProps> = {
  title: 'Atoms/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['.25', '.5', '.75', '1'],
    },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<LoadingProps>;

export const Default: Story = {
  args: {
    size: '.25',
  },
};
