'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '../components/atoms';
import { Button, Input } from '../components/molecules';

const schema = z.object({
  phone: z
    .string()
    .min(11, 'شماره موبایل باید ۱۱ رقم باشد')
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <Typography variant="text-medium-16-100" className="text-center text-gray-800">
          ورود به حساب کاربری
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="شماره موبایل"
            placeholder="مثلاً 09123456789"
            {...register('phone')}
            error={errors.phone?.message}
          />

          <Input
            label="رمز عبور"
            type="password"
            placeholder="رمز عبور را وارد کنید"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full">
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
}
