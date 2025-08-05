"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Typography } from "@/app/components/atoms";
import { Button, Input } from "@/app/components/molecules";

import { useAuth } from "@/app/hook/auth/useAuth";
import { ROUTES, API, TEXT, schema } from "@/app/constants";

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: FormData) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(API.RANDOM_USER);
      if (!res.ok) throw new Error(TEXT.LOGIN.ERROR_FETCH);

      const json = await res.json();
      const user = json.results[0];

      login(user);
      router.push(ROUTES.DASHBOARD);

      alert(TEXT.LOGIN.SUCCESS);
    } catch (error: any) {
      setErrorMsg(error.message || TEXT.LOGIN.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center p-6 space-y-6">
      <Typography variant="text-medium-16-100" className="text-center text-gray-800">
        {TEXT.LOGIN.BUTTON_LOGIN}
      </Typography>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <Input
          label={TEXT.LOGIN.LABEL_PHONE}
          placeholder={TEXT.LOGIN.PLACEHOLDER_PHONE}
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label={TEXT.LOGIN.LABEL_PASSWORD}
          type="password"
          placeholder={TEXT.LOGIN.PLACEHOLDER_PASSWORD}
          {...register("password")}
          error={errors.password?.message}
        />

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <Button loading={loading} type="submit" className="w-full" disabled={loading}>
          {TEXT.LOGIN.BUTTON_LOGIN}
        </Button>
      </form>
    </div>
  );
}
