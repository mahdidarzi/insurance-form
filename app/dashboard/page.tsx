'use client';

import type { User } from "@/app/types/user";

interface SessionWithUser {
  user: User;
  expires: string;
}

export default function Dashboard() {

  return (
      <div className="animate-fade-in text-3xl font-bold text-center mt-10">
        Welcome!
    </div>
  );
}
