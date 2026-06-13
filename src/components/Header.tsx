"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";
import { brand } from "@/config/branding";

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
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Logo lockup */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/logo_byteflowailabs.png"
              alt="ByteFlow AI Labs"
              width={44}
              height={44}
              loading="eager"
              style={{ height: "44px", width: "auto" }}
              priority
            />
            <span className="font-heading text-[20px] leading-none">
              <span className="font-bold text-brand-text">ByteFlow</span>
              {" "}
              <span
                className="font-light"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >AI Labs</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs font-medium text-brand-muted hover:text-accent tracking-[0.15em] uppercase transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 shrink-0 text-brand-bg font-body"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            Get a Demo
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className={`block w-6 h-[1.5px] bg-brand-text origin-center transition-all duration-300 ${
                open ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-brand-text transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-brand-text origin-center transition-all duration-300 ${
                open ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[60] w-[280px] bg-brand-bg border-l border-primary/20 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-primary/20 shrink-0">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src="/logo_byteflowailabs.png"
              alt="ByteFlow AI Labs"
              width={44}
              height={44}
              loading="eager"
              style={{ height: "44px", width: "auto" }}
            />
            <span className="font-heading text-[18px] leading-none">
              <span className="font-bold text-brand-text">ByteFlow</span>
              {" "}
              <span
                className="font-light"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >AI Labs</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-6 py-6 flex-1 overflow-y-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-body text-sm font-medium text-brand-muted hover:text-accent tracking-[0.15em] uppercase transition-colors duration-200 py-4 border-b border-primary/10 last:border-0"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 shrink-0">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center px-5 py-3.5 text-brand-bg font-body text-xs font-medium tracking-[0.15em] uppercase"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            Get a Demo
          </Link>
        </div>
      </nav>
    </>
  );
}
