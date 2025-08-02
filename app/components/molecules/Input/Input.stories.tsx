import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input, { InputProps } from './';

const meta: Meta<InputProps> = {
  title: 'Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    label: 'نام و نام خانوادگی',
    placeholder: 'نام خود را وارد کنید',
    error: '',
    disabled: false,
  },
};

export const WithError: Story = {
  args: {
    label: 'کد ملی',
    placeholder: 'مثلاً 0012345678',
    error: 'کد ملی وارد شده معتبر نیست.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'شماره تلفن',
    placeholder: 'مثلاً 09123456789',
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <Input
        placeholder="کد ملی"
        value={value}
        onChange={e => setValue(e.target.value)}
        name=""
      />
    );
  },
};

// Add the form story with validation using react-hook-form and zod
export const FormWithValidation: Story = {
  render: () => {
    const schema = z.object({
      nationalId: z.string().refine((val) => /^[0-9]{10}$/.test(val), {
        message: 'کدملی وارد شده معتبر نیست.',
      }),
      phone: z.string().refine((val) => /^(0?9\d{9})$/.test(val), {
        message: 'شماره تلفن همراه معتبر نیست.',
      }),
    });

    type FormData = z.infer<typeof schema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    nationalId: '',
    phone: '',
  },
});

    return (
      <form
        onSubmit={handleSubmit((data) => {
          // You can do whatever with data here
          alert(JSON.stringify(data, null, 2));
        })}
        style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 340 }}
      >
        <Input
          label="کد ملی:"
          placeholder="مثلاً ۰۰۰۰۰۰۰۰۰۰"
          {...register('nationalId')}
          error={errors.nationalId}
          name="nationalId"
        />
        <Input
          label="شماره تلفن همراه:"
          placeholder="مثلاً ۰۹۱۲۱۱۱۱۱۱۱"
          {...register('phone')}
          error={errors.phone}
          name="phone"
        />
        <button type="submit" style={{ width: 100, padding: '8px 16px' }}>
          ارسال
        </button>
      </form>
    );
  },
};
