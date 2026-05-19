"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type HashLinkProps = {
  href: `/#${string}`;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

export function HashLink({
  href,
  children,
  className,
  onNavigate,
}: HashLinkProps) {
  const pathname = usePathname();
  const id = href.replace("/#", "");
  const onHome = pathname === "/";

  if (onHome) {
    return (
      <a
        href={`#${id}`}
        className={cn("transition-colors hover:text-[#C45C3E]", className)}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(id);
          onNavigate?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-[#C45C3E]", className)}
      onClick={() => onNavigate?.()}
    >
      {children}
    </Link>
  );
}
