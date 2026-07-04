import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FileText, Download, BookOpen, FileCheck2, Layers } from "lucide-react";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Resources & Documentation — IUCB" },
      {
        name: "description",
        content:
          "Access official IUCB resources, accreditation manuals, policies, procedures, guidance documents, templates, and application forms.",
      },
    ],
  }),
  component: Documentation,
});

const categories = [
  "All Documents",
  "Governance",
  "Standards",
  "Forms",
  "Public Reports",
];

const docs = [
  {
    title: "IUCB Code of Conduct",
    desc: "Ethical guidelines and professional responsibilities for all accredited organizations, auditors, and training providers.",
    version: "v2.0 · Jan 2026",
    size: "PDF · 1.4 MB",
    cat: "Governance",
  },
  {
    title: "Appeals and Complaints Procedure",
    desc: "Official procedure for submitting appeals, complaints, and dispute resolution requests.",
    version: "v3.1 · Jan 2026",
    size: "PDF · 950 KB",
    cat: "Governance",
  },
  {
    title: "Fee Structure 2026",
    desc: "Complete schedule of accreditation, certification, assessment, surveillance, and renewal fees.",
    version: "2026 Edition",
    size: "PDF · 780 KB",
    cat: "Public Reports",
  },
  {
    title: "ISO/IEC 27001 Transition Guide",
    desc: "Guidance for organizations transitioning to the latest ISO/IEC 27001 requirements.",
    version: "v1.8",
    size: "PDF · 2.2 MB",
    cat: "Standards",
  },
  {
    title: "Accreditation Application Form",
    desc: "Official application form for Certification Bodies, Individual Auditors, and Training Providers.",
    version: "2026 Edition",
    size: "DOCX · 420 KB",
    cat: "Forms",
  },
];

function Documentation() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Documents");

  const filtered = docs.filter((d) => {
    const matchesCat = cat === "All Documents" || d.cat === cat;
    const matchesQ = !q || d.title.toLowerCase().includes(q.toLowerCase()) || d.desc.toLowerCase().includes(q.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <>
     <PageHero
  eyebrow="Resources & Documentation"
  title={
    <>
      Resource Center &
      <span className="text-gold"> Documentation</span>
    </>
  }
  description="Access official IUCB policies, governance frameworks, accreditation standards, public reports, application forms, and guidance documents designed to support Certification Bodies, Individual Auditors, and Training Providers."
/>

      <section className="py-12 bg-white border-b border-border">
        <div className="container-x">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: FileText, v: docs.length, l: "Published Documents" },
              { icon: Layers, v: 6, l: "Document Categories" },
              { icon: BookOpen, v: 4, l: "Languages Supported" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-6 flex items-center gap-4 hover:border-secondary hover:shadow-md transition">
                <div className="h-12 w-12 rounded-lg bg-light-blue text-primary grid place-items-center flex-shrink-0">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-soft-gray">
        <div className="container-x">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search policies, standards, forms or reports..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition ${
                    cat === c ? "bg-primary text-primary-foreground" : "bg-white border border-border text-navy hover:border-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No documents found. Try adjusting your search or filter.
              </div>
            ) : (
              filtered.map((d) => (
                <article key={d.title} className="rounded-xl border border-border bg-white p-6 hover:border-secondary hover:shadow-lg transition group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-12 w-12 rounded-lg bg-light-blue text-primary grid place-items-center flex-shrink-0">
                      <FileCheck2 className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary bg-light-blue/40 px-2.5 py-1 rounded">{d.cat}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-navy leading-tight">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs font-mono text-muted-foreground">{d.version} · {d.size}</div>
                    <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-secondary bg-light-blue/40 rounded-md hover:bg-secondary hover:text-white transition">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
