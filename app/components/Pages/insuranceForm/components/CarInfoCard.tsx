'use client';

import React from 'react';
import { Typography } from '@/app/components/atoms';
import Image from 'next/image';

type CarInfoCardProps = {
  className?: string;
};

export const CarInfoCard: React.FC<CarInfoCardProps> = ({ className }) => {
  const data = [
    { label: "شرکت بیمه گر", value: "پارسیان" },
    { label: "برند خودرو", value: "پژو" },
    { label: "مدل خودرو", value: "206 تیپ 6" },
  ];

  return (
    <div className={`w-[280px] flex flex-col mx-auto mt-6 ${className}`}>
      <div className="border-[2px] w-full h-[50px] rounded-[5px] flex">
        <div className="w-[55px] h-full flex justify-center items-center">
          <Typography variant="text-semibold-18-100-black">60</Typography>
        </div>
        <div className="w-[180px] h-full border-[2px] border-b-0 border-t-0 flex justify-center items-center gap-2.5">
          <Typography variant="text-semibold-18-100-black">988</Typography>
          <Typography variant="text-semibold-18-100-black">ک</Typography>
          <Typography variant="text-semibold-18-100-black">64</Typography>
        </div>
        <div className="w-[48px] h-full flex flex-col items-center bg-[#1D48E1]">
          <div className="w-[30px] h-[15px] border-white mt-2 relative">
            <Image
              src="/flagIran.png"
              alt="flag iran"
              title="flag iran"
              fill
              sizes="21px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <Typography variant="text-normal-12-100-gray" className="!font-black !text-white mt-1">
            I.R.
          </Typography>
        </div>
      </div>

      <div className="mt-6 flex flex-col h-[84px] justify-between">
        {data.map(({ label, value }, index) => (
          <div className="flex items-center w-full" key={index}>
            <Typography variant="text-normal-14-100-gray">{label}</Typography>
            <div className="flex-1 h-0 border-t border-dashed border-gray-400 mx-2" />
            <Typography variant="text-normal-14-100-black">{value}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

