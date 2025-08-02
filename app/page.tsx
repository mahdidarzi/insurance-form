"use client";

import { Typography } from "@/app/components/atoms";
import { Button, Input } from "@/app/components/molecules";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';

export default function Home() {
  const data = [
    { label: "شرکت بیمه گر", value: "پارسیان" },
    { label: "برند خودرو", value: "پژو" },
    { label: "مدل خودرو", value: "206 تیپ 6" },
  ];
  const schema = z.object({
    nationalId: z
      .string()
      .min(1, { message: 'وارد کردن کدملی الزامی است.' })
      .refine((val) => /^[0-9]{10}$/.test(val), {
        message: 'کدملی وارد شده معتبر نیست.',
      }),
    phone: z
      .string()
      .min(1, { message: 'وارد کردن شماره تلفن همراه الزامی است.' })
      .refine((val) => /^(0?9\d{9})$/.test(val), {
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
  console.log('errors', errors);

  return (
    <div>
      {/* <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"> */}
      <main className="w-full max-w-4xl">
        {/* sections 1 */}
        <div className="w-full h-[56px] shadow-[0px_3px_7px_-1px_rgba(34,34,34,0.1)] flex flex-row items-center">
          <div className="w-[32px] h-[32px] bg-[#FFC453] rounded-[5px] mr-2 flex justify-center items-center">
            <div className="w-[21px] h-[21px] border"></div>
          </div>
          <Typography className="mr-1.5" variant={"text-medium-18-100"}>مشخصات بیمه نامه</Typography>
        </div>
        {/* sections 1 */}

        {/* sections 2 */}

        <div className="w-[280px] flex flex-col mx-auto mt-6">
          <div className="border-[2px] w-full h-[50px] rounded-[5px] flex">
            <div className="w-[55px] h-full flex justify-center items-center">
              <Typography variant={"text-semibold-18-100-black"}>60</Typography>

            </div>
            <div className="w-[180px] h-full border-[2px] border-b-0 border-t-0 flex justify-center items-center gap-2.5">
              <Typography variant={"text-semibold-18-100-black"}>988</Typography>
              <Typography variant={"text-semibold-18-100-black"}>ک</Typography>
              <Typography variant={"text-semibold-18-100-black"}>64</Typography>
            </div>
            <div className="w-[48px] h-full flex flex-col items-center bg-[#1D48E1]">
              <div className="w-[30px] h-[15px] border border-white mt-2"></div>
              <Typography variant={"text-normal-12-100-gray"} className="!font-black !text-white mt-1">I.R.</Typography>
            </div>
          </div>
          {/* part 2 in sec 2 */}

          <div className="mt-6 flex flex-col h-[84px] justify-between">
            {data.map(({ label, value }, index) => (
              <div className="flex items-center w-full" key={index}>
                <Typography variant={"text-normal-14-100-gray"}>{label}</Typography>
                <div className="flex-1 h-0 border-t border-dashed border-gray-400 mx-2" />
                <Typography variant={"text-normal-14-100-black"}>{value}</Typography>
              </div>
            ))}
          </div>
          {/* part 2 in sec 2 */}
        </div>

        {/* sections 1  copy*/}
        <div className="mt-[32px] w-full h-[56px] shadow-[0px_3px_7px_-1px_rgba(34,34,34,0.1)] flex flex-row items-center">
          <div className="w-[32px] h-[32px] bg-[#FFC453] rounded-[5px] mr-2 flex justify-center items-center">
            <div className="w-[21px] h-[21px] border"></div>
          </div>
          <Typography className="mr-1.5" variant={"text-medium-18-100"}>مشخصات مالک خودرو</Typography>
        </div>
        {/* sections 1 copy*/}

        {/* sections 3*/}

        <form
          className="w-[322px] mx-auto"
          onSubmit={handleSubmit((data) => {
            // You can do whatever with data here
            alert(JSON.stringify(data, null, 2));
          })}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography className="mt-6 h-[28px]" variant={"text-medium-16-100"}>لطفا اطلاعات شخصی مالک خودرو را وارد کنید:</Typography>

          <Input
            type="text"
            label="کد ملی:"
            placeholder="کد ملی:"
            error={errors.nationalId}
            {...register('nationalId')}
            name="nationalId"
          />
          <Input
            type="text"
            label="شماره تلفن همراه:"
            placeholder="شماره تلفن همراه:"
            error={errors.phone}
            {...register('phone')}
            name="phone"
          />

          <Typography className="mt-11 h-[24px]" variant={"text-medium-16-100"}>آدرس جهت درج روی بیمه‌نامه</Typography>
          <Typography as="div" className="h-[56px]" variant={"text-normal-14-28-black"}>لطفا آدرسی که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید.</Typography>
          <Button variant='cta' className="mt-1.5">
            <Typography as="div" className="" variant={"text-semibold-16-100-black"}>انتخاب آدرس‌های من</Typography>
          </Button>
          <div className="flex justify-end">
            <Button variant='primary' className="mt-6" disabled>
              تایید و ادامه
            </Button>
          </div>
          {/* <button type="submit" style={{ width: 100, padding: '8px 16px' }}>
            ارسال
          </button> */}
        </form>

        {/* sections 3*/}







      </main>
    </div>
  );
}
