"use client";

import { RadioButton, Typography } from "@/app/components/atoms";
import { FC } from "react";

type Address = {
  id: string;
  name: string;
  details: string;
};

type AddressListProps = {
  mode: 'address-list' | 'confirm-delete';
  addresses?: Address[];
  selectedId: string;
  handleSelect: (id: string) => void;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  setSelectedId: (id: string) => void;
};

export const AddressList: FC<AddressListProps> = ({
  mode,
  addresses = [],
  selectedId,
  handleSelect,
  handleRemove,
  setSelectedId,
}) => {
  if (mode === "confirm-delete") {
    const addressToDelete = addresses.find((a) => a.id === selectedId);
    console.log('addressToDelete',addressToDelete);
    console.log('selectedId',selectedId);
    
    return (
      <div className="h-[119px]">
        <Typography variant="text-normal-14-100-black" className="!font-medium h-[22px] mt-3.5">
          آیا از حذف آدرس خود، مطمین هستید؟
        </Typography>
        <div className="w-[338px] h-[65px] bg-[#F2F2F2] mt-4 px-2 flex flex-col">
          <Typography variant="text-normal-14-100-black" className="!font-medium h-[22px] mt-2">
            {addressToDelete?.name || "آدرس انتخاب‌شده"}
          </Typography>
          <Typography variant="text-normal-12-100-gray" className="!font-medium h-[19px] mt-2">
            {addressToDelete?.details || "جزئیات آدرس در دسترس نیست"}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[195px] flex flex-col gap-y-4">
      {addresses.slice(1, 4).map((item) => (
        <div key={item.id} className="cursor-pointer" onClick={() => setSelectedId(item.id)}>
          <div className="flex items-center justify-between h-[22px]">
            <div className="flex items-center justify-between">
              <RadioButton
                name="address"
                value={item.id}
                checked={selectedId === item.id}
                onChange={() => handleSelect(item.id)}
                label="address"
              />
              <Typography as="div" className="!font-medium mr-1.5" variant="text-normal-14-100-black">
                {item.name}
              </Typography>
            </div>
            <button
              onClick={(e) =>{ handleRemove(e, item.id)}}
              aria-label="بستن"
              className="text-[#FFA5A5] w-2.5 h-2.5 flex items-center justify-center mx-3 cursor-pointer"
              type="button"
            >
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
          <Typography as="div" className="h-[19px] mt-2 mr-6" variant="text-normal-12-100-gray">
            {item.details}
          </Typography>
        </div>
      ))}
    </div>
  );
};
