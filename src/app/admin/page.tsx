import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
};

async function getStats() {
  const [totalLeads, newLeads, totalPosts] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: LeadStatus.New } }),
    prisma.post.count(),
  ]);
  return { totalLeads, newLeads, totalPosts };
}

async function getRecentLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export default async function AdminDashboard() {
  const [stats, recentLeads] = await Promise.all([
    getStats(),
    getRecentLeads(),
  ]);

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, href: "/admin/leads" },
    { label: "New Leads", value: stats.newLeads, href: "/admin/leads", highlight: stats.newLeads > 0 },
    { label: "Blog Posts", value: stats.totalPosts, href: "/admin/blog" },
  ];

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Overview
          </p>
        </div>
        <h1 className="font-heading font-semibold text-brand-text text-4xl">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-brand-surface border border-primary/15 p-6 hover:border-primary/35 transition-colors group"
          >
            <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-3">
              {card.label}
            </p>
            <p className={`font-heading font-semibold text-5xl transition-colors ${
              card.highlight ? "text-accent" : "text-brand-text"
            } group-hover:text-accent`}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { href: "/admin/blog/new", icon: "✎", title: "New Blog Post", sub: "Publish content" },
          { href: "/admin/leads", icon: "✉", title: "View Leads", sub: `${stats.newLeads} new enquiries` },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-4 bg-brand-surface border border-primary/15 p-5 hover:border-primary/35 transition-colors group"
          >
            <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-accent text-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              {a.icon}
            </div>
            <div>
              <p className="font-body text-sm font-medium text-brand-text">{a.title}</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">{a.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-brand-text text-2xl">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="font-body text-xs text-accent hover:text-primary tracking-[0.15em] uppercase transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="border border-primary/15 divide-y divide-primary/10">
          {recentLeads.length === 0 ? (
            <p className="font-body text-sm text-brand-muted p-6">No leads yet.</p>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-4 hover:bg-brand-surface/50 transition-colors">
                <div className="min-w-0">
                  <p className="font-body text-sm text-brand-text">{lead.name}</p>
                  <p className="font-body text-xs text-brand-muted mt-0.5">
                    {lead.email ?? lead.phone ?? "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`font-body text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 ${
                    lead.status === LeadStatus.New
                      ? "text-accent bg-accent/10"
                      : lead.status === LeadStatus.Read
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-brand-muted bg-brand-muted/10"
                  }`}>
                    {lead.status}
                  </span>
                  <span className="font-body text-[10px] text-brand-muted">
                    {lead.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
