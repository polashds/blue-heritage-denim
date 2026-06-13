import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — ByteFlow AI Labs",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");

  const { callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      {/* Blue radial glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-sm">
        {/* Logo lockup */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2.5">
            <span
              className="font-heading font-semibold text-[26px]"
              style={{
                background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ByteFlow
            </span>
            <span className="font-heading font-light text-[26px] text-brand-text">AI Labs</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-brand-surface border border-primary/15 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-6 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                Admin Access
              </p>
            </div>
            <h1 className="font-heading font-semibold text-brand-text text-3xl">
              Sign In
            </h1>
          </div>

          <LoginForm callbackUrl={callbackUrl ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
