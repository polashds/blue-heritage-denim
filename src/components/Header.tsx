"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
          {/* Wordmark */}
          <Link href="/" className="shrink-0 flex flex-col leading-none group">
            <span className="font-heading font-bold text-brand-indigo text-[17px] tracking-[0.18em] uppercase">
              Blue Heritage
            </span>
            <span className="font-body font-light text-brand-muted text-[9px] tracking-[0.55em] uppercase mt-0.5">
              Denim
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-primary"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className={`block w-5 h-px bg-brand-text origin-center transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-3.5 h-px bg-brand-text transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-px bg-brand-text origin-center transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[55] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[60] w-[280px] bg-brand-bg border-l border-brand-border flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-brand-border shrink-0">
          <Link href="/" onClick={() => setOpen(false)} className="flex flex-col leading-none">
            <span className="font-heading font-bold text-brand-indigo text-[16px] tracking-[0.18em] uppercase">
              Blue Heritage
            </span>
            <span className="font-body font-light text-brand-muted text-[9px] tracking-[0.55em] uppercase mt-0.5">
              Denim
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 flex-1 overflow-y-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200 py-4 border-b border-brand-border last:border-0 ${
                pathname === href ? "text-primary" : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
