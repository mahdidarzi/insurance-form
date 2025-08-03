"use client";

import { GENERAL_CONTENT, ROUTES } from "@/app/components/general";
import { CarInfoCard, GeneralHeader } from "@/app/components/Pages/insuranceForm";
import { Typography } from "@/app/components/atoms";
import { Button } from "@/app/components/molecules";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function SuccessPage() {
    const router = useRouter();
    const goBackOrHome = () => {
        router.replace(ROUTES.HOME);
    };
    return (
        <div>
            <GeneralHeader title={GENERAL_CONTENT.BIMENAME_DETAIL} />
            <div className="mx-auto flex flex-col items-center">
                <div className="w-[60px] h-[66px] mt-6 relative">
                    <Image
                        src="/validation_form 1.png"
                        alt="validation_form 1"
                        title="validation_form 1"
                        fill
                        sizes="60px"
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>
                <Typography variant="text-medium-16-100" className="h-auto mt-4">ثبت اطلاعات شما، با <span className="text-[#34A862]">موفقیت</span> انجام شد.</Typography>
            </div>
            <CarInfoCard className='mt-8' />
            <Button onClick={goBackOrHome} className="absolute bottom-3 left-[18px]" variant="primary">{GENERAL_CONTENT.ERROR_SECONDARY_ACTION}</Button>
        </div>
    );
}
