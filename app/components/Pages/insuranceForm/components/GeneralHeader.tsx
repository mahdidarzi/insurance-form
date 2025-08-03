"use client";

import { Typography } from "@/app/components/atoms";
import Image from "next/image";
import { ReactNode } from "react";

interface GeneralHeaderProps {
  title: string;
  className?: string;
  icon?: ReactNode; // Optional custom icon inside the yellow box
}

export const GeneralHeader = ({ title, icon,className }: GeneralHeaderProps) => {
  return (
    <div className={`w-full h-[56px] shadow-[0px_3px_7px_-1px_rgba(34,34,34,0.1)] flex flex-row items-center ${className}`}>
      <div className="w-[32px] h-[32px] bg-[#FFC453] rounded-[5px] mr-2 flex justify-center items-center">
 <div className="w-[21px] h-[21px] relative">
      <Image
        src="/car 1.png"    
        alt="Car icon"       
        title="Car icon"       
        fill           
        sizes="21px"
        style={{ objectFit: 'contain' }} 
        priority
      />
    </div>
      </div>
      <Typography className="mr-1.5" variant="text-medium-18-100">
        {title}
      </Typography>
    </div>
  );
};
