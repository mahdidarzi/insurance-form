import z from "zod";

export const ROUTES = {
  DASHBOARD: "/dashboard",
  AUTH: "/auth",
};

export const API = {
  RANDOM_USER: "https://randomuser.me/api/?results=1&nat=us",
};

export const TEXT = {
  LOGIN: {
    SUCCESS: "ورود با موفقیت انجام شد!",
    ERROR_FETCH: "خطا در دریافت اطلاعات کاربر",
    GENERIC_ERROR: "خطایی رخ داده است",
    BUTTON_LOGIN: "ورود",
    BUTTON_LOADING: "در حال ورود...",
    LABEL_PHONE: "شماره موبایل",
    PLACEHOLDER_PHONE: "مثلاً 09123456789",
    LABEL_PASSWORD: "رمز عبور",
    PLACEHOLDER_PASSWORD: "رمز عبور را وارد کنید",
  },
};

export const schema = z.object({
  phone: z
    .string()
    .min(11, "شماره موبایل باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});