"use client";

import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={cn(
          "text-sm text-[#5C534C] transition-colors hover:text-[#C45C3E]",
          className
        )}
      >
        로그아웃
      </button>
    </form>
  );
}
