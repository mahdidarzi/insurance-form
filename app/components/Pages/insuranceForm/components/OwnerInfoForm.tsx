'use client';

import React from 'react';
import { Typography } from '@/app/components/atoms';
import { Input, Button } from '@/app/components/molecules';
import { GENERAL_CONTENT } from '@/app/components/general';

interface OwnerInfoFormProps {
  addresses?: { id: string; details: string }[];
  selectedId?: string;
  onOpenModal: () => void;
  onSubmit: (data: { nationalId: string; phone: string }) => void;
  handleSubmit: (callback: (data: { nationalId: string; phone: string }) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  errors: any;
  register: any;
  watchedNationalId: string;
  watchedPhone: string;
}

export const OwnerInfoForm: React.FC<OwnerInfoFormProps> = ({
  addresses,
  selectedId,
  onOpenModal,
  onSubmit,
  handleSubmit,
  isSubmitting,
  errors,
  register,
  watchedNationalId,
  watchedPhone,
}) => {
  return (
    <form
      className="w-[322px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Typography className="mt-6 h-[28px]" variant={"text-medium-16-100"}>
        {GENERAL_CONTENT.PERSONAL_INFO_TITLE}
      </Typography>

      <Input
        type="text"
        label={GENERAL_CONTENT.NATIONAL_ID_LABEL}
        placeholder={GENERAL_CONTENT.NATIONAL_ID_PLACEHOLDER}
        error={errors.nationalId}
        {...register('nationalId')}
        name="nationalId"
      />
      <Input
        type="text"
        label={GENERAL_CONTENT.PHONE_LABEL}
        placeholder={GENERAL_CONTENT.PHONE_PLACEHOLDER}
        error={errors.phone}
        {...register('phone')}
        name="phone"
      />

      <div className={` ${selectedId ? 'h-[156px] mt-9' : 'h-[144px] mt-11'}`}>
        <Typography className="h-[24px]" variant={"text-medium-16-100"}>
          {GENERAL_CONTENT.ADDRESS_TITLE}
        </Typography>

        {selectedId && addresses?.find(a => a.id === selectedId) ? (
          <Typography as="div" variant="text-normal-12-100-gray" className="h-[19px] mt-[15px]">
            {addresses.find(a => a.id === selectedId)!.details}
          </Typography>
        ) : (
          <Typography as="div" className="h-[56px]" variant="text-normal-14-28-black">
            {GENERAL_CONTENT.ADDRESS_PLACEHOLDER}
          </Typography>
        )}

        {!selectedId && (
          <Button type="button" onClick={onOpenModal} variant='cta' className="mt-1.5">
            <Typography as="div" variant={"text-semibold-16-100-black"}>
              {GENERAL_CONTENT.SELECT_ADDRESS_BUTTON}
            </Typography>
          </Button>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="mt-6 min-w-[131px] !w-auto"
          disabled={
            isSubmitting ||
            !selectedId ||
            !!errors.nationalId ||
            !!errors.phone ||
            !watchedNationalId ||
            !watchedPhone
          }
          loading={isSubmitting}
        >
          {GENERAL_CONTENT.SUBMIT_BUTTON}
        </Button>
      </div>
    </form>
  );
};
