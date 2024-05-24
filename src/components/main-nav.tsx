"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">MyTasksApp</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Tasks
        </Link>
        <Link
          href="/users"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/users" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Users
        </Link>
      </nav>
    </div>
  );
}
