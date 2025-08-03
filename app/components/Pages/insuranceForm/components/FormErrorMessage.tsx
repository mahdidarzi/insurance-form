// components/molecules/FormErrorMessage.tsx

import { Typography } from "@/app/components/atoms";
import { GENERAL_CONTENT } from "@/app/components/general";

export const FormErrorMessage = () => (
  <div className="h-[70px]">
    <Typography
      as="div"
      className="!font-medium h-[22px] mt-[18px]"
      variant="text-normal-14-100-black"
    >
      {GENERAL_CONTENT.FORM_ERROR_TITLE}
    </Typography>
    <Typography
      as="div"
      className="!font-medium h-[22px] mt-2.5"
      variant="text-normal-14-100-black"
    >
      {GENERAL_CONTENT.FORM_ERROR_RETRY}
    </Typography>
  </div>
);
