"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RoundedButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  background?: string;
  className?: string;
  dark?: boolean;
};

export function RoundedButton({
  children,
  href,
  onClick,
  background = "#455ce9",
  className,
  dark = false,
}: RoundedButtonProps) {
  const [hover, setHover] = useState(false);

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full h-[150%] w-[150%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          background,
          transform: hover
            ? "translate(-50%, -76%) scale(1)"
            : "translate(-50%, 0%) scale(0.4)",
        }}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          hover ? "text-white" : dark ? "text-white" : "text-canvas",
        )}
      >
        {children}
      </span>
    </>
  );

  const classes = cn(
    "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 py-5 text-[15px] tracking-[0.04em]",
    dark ? "bg-[#1c1d20] text-white" : "bg-white text-canvas",
    className,
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={onClick ? "button" : "submit"}
      className={classes}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inner}
    </button>
  );
}
