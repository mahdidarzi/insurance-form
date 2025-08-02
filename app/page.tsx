"use client";

import { RadioButton, Typography } from "@/app/components/atoms";
import { Button, Input, Modal } from "@/app/components/molecules";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

export default function Home() {

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('https://front-end-task.bmbzr.ir/my-addresses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid=s%3AMSHqW055L1x6v_yZvHrCnfEtiPCDqOk2.Vi%2FeqDS4pcwV05BaghaNfkvKdGB9OcMMBG00LxY9QQ8',
        },
        credentials: 'include', // Important for cookies to work
      });

      const data = await res.json();
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchData();
}, []);

  interface AddressItem {
    id: string;
    title: string;
    description: string;
  }

  const mockAddresses: AddressItem[] = [
    {
      id: "1",
      title: "آدرس شماره 1",
      description: "فارس، شیراز، خیابان جمهوری، بالاتر از فلان، پلاک ۶، واحد ۲۳۴",
    },
    {
      id: "2",
      title: "آدرس شماره 2",
      description: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲۳",
    },
    {
      id: "3",
      title: "آدرس شماره 3",
      description: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲۳",
    },
  ];


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
  const [selectedId, setSelectedId] = useState<string>(mockAddresses[0].id);
  const [addresses, setAddresses] = useState<AddressItem[]>(mockAddresses);
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();  // prevents bubbling to parent
    e.preventDefault();   // prevents default behavior

    setAddresses((prev) => prev.filter((item) => item.id !== id));

    if (id === selectedId) {
      setSelectedId(addresses.length > 1 ? addresses[0].id : "");
    }
  };


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

        {/* sections modal*/}
        <Modal hasSingleButton title={"انتخاب آدرس"} onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true}>
          <div className="h-[195px] flex flex-col border gap-y-4">
            {addresses.map((item) => {
              return (
                <div onClick={() => setSelectedId(item.id)} key={item.id} className="cursor-pointer">
                  <div className="flex items-center justify-between h-[22px]">
                    <div className="flex items-center justify-between">
                      <RadioButton name={"address"} value={item.id} checked={selectedId === item.id} onChange={handleSelect}
                        label={"address"} />
                      <Typography as="div" className="!font-medium mr-1.5" variant={"text-normal-14-100-black"}>{item.title}</Typography>
                    </div>
                    <button
                      onClick={(e) => handleRemove(e, item.id)}
                      aria-label="بستن"
                      className="text-[#FFA5A5] w-2.5 h-2.5 flex items-center justify-center  mx-3 cursor-pointer"
                      type="button"
                    >
                      {/* Simple close icon (X) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 14 14"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="1" y1="1" x2="13" y2="13" />
                        <line x1="13" y1="1" x2="1" y2="13" />
                      </svg>
                    </button>

                  </div>
                  <Typography as="div" className="h-[19px] mt-2 mr-6" variant={"text-normal-12-100-gray"}>{item.description}</Typography>
                </div>
              )
            })}

          </div>
        </Modal>
        {/* sections modal*/}
      </main>
    </div>
  );
}
