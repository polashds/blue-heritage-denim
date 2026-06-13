"use client";

import { useState } from "react";

const rows = [
  { size: "24", waist: '24" / 61cm', hip: '34" / 86cm', inseam: '28"–32"' },
  { size: "26", waist: '26" / 66cm', hip: '36" / 91cm', inseam: '28"–32"' },
  { size: "28", waist: '28" / 71cm', hip: '38" / 96cm', inseam: '28"–34"' },
  { size: "30", waist: '30" / 76cm', hip: '40" / 101cm', inseam: '28"–34"' },
  { size: "32", waist: '32" / 81cm', hip: '42" / 107cm', inseam: '30"–34"' },
  { size: "34", waist: '34" / 86cm', hip: '44" / 112cm', inseam: '30"–34"' },
  { size: "36", waist: '36" / 91cm', hip: '46" / 117cm', inseam: '30"–34"' },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-brand-border pt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between font-body text-[11px] tracking-[0.2em] uppercase text-brand-muted hover:text-brand-text transition-colors duration-200"
      >
        Size Guide
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full font-body text-xs text-left">
            <thead>
              <tr className="border-b border-brand-border">
                {["Size", "Waist", "Hip", "Inseam"].map((h) => (
                  <th
                    key={h}
                    className="pb-2 pr-6 font-medium text-brand-text whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {rows.map((r) => (
                <tr key={r.size}>
                  <td className="py-2 pr-6 font-medium text-brand-text">
                    {r.size}
                  </td>
                  <td className="py-2 pr-6 text-brand-muted whitespace-nowrap">
                    {r.waist}
                  </td>
                  <td className="py-2 pr-6 text-brand-muted whitespace-nowrap">
                    {r.hip}
                  </td>
                  <td className="py-2 text-brand-muted whitespace-nowrap">
                    {r.inseam}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-body text-[10px] text-brand-muted/70 leading-relaxed">
            All measurements are approximate. Between sizes? Size up. New raw
            denim relaxes 1–2&quot; at the waist after a few wears.
          </p>
        </div>
      )}
    </div>
  );
}
