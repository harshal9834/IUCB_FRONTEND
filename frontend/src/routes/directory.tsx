import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, BadgeCheck, Building2, Users, GraduationCap, QrCode, ShieldCheck, AlertCircle, Calendar, FileCheck2, Download, Loader2 } from "lucide-react";
import { PageHero } from "../components/page-hero";
import { downloadCertificatePdf } from "../lib/certificate-pdf";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Accredited Directory — IUCB" },
      { name: "description", content: "Search the global IUCB directory of accredited certification bodies, auditors, and training providers." },
    ],
  }),
  component: Directory,
});

type Entry = { name: string; type: "Certification Body" | "Auditor" | "Training Provider"; country: string; standards: string[]; id: string };

const entries: Entry[] = [
  { name: "EuroCert International", type: "Certification Body", country: "Germany", standards: ["ISO 27001", "ISO 9001"], id: "IUCB-ACB-0421" },
  { name: "Nordic Assurance Group", type: "Certification Body", country: "Sweden", standards: ["ISO 27701", "ISO 14001"], id: "IUCB-ACB-0388" },
  { name: "AsiaCert Holdings", type: "Certification Body", country: "Singapore", standards: ["ISO 27001", "SOC 2"], id: "IUCB-ACB-0501" },
  { name: "Dr. Aisha Khan", type: "Auditor", country: "United Arab Emirates", standards: ["ISO 27001 LA"], id: "IUCB-AAP-1284" },
  { name: "Marco Bertelli", type: "Auditor", country: "Italy", standards: ["ISO 9001 LA"], id: "IUCB-AAP-0921" },
  { name: "Compliance Academy EU", type: "Training Provider", country: "Netherlands", standards: ["ISO 27001", "ISO 9001"], id: "IUCB-ATPP-203" },
  { name: "Global Audit Institute", type: "Training Provider", country: "United Kingdom", standards: ["ISO 19011"], id: "IUCB-ATPP-187" },
  { name: "Pacific Cert Services", type: "Certification Body", country: "Australia", standards: ["ISO 27001"], id: "IUCB-ACB-0445" },
];

const iconFor = (t: Entry["type"]) =>
  t === "Certification Body" ? Building2 : t === "Auditor" ? Users : GraduationCap;

type Result = {
  ok: boolean;
  id: string;
  holder?: string;
  scope?: string;
  issued?: string;
  expires?: string;
  status?: string;
};

const sample: Record<string, Result> = {
  "IUCB-ACB-0421": { ok: true, id: "IUCB-ACB-0421", holder: "EuroCert International", scope: "ISO/IEC 27001:2022", issued: "2026-02-14", expires: "2029-02-13", status: "Active" },
  "IUCB-AAP-1284": { ok: true, id: "IUCB-AAP-1284", holder: "Dr. Aisha Khan", scope: "ISO 27001 Lead Auditor", issued: "2025-09-02", expires: "2028-09-01", status: "Active" },
  "ACC-2026-8942": { ok: true, id: "ACC-2026-8942", holder: "Meridian Compliance Group", scope: "ISO/IEC 17021-1:2015 — Management System Certification", issued: "2026-01-20", expires: "2029-01-19", status: "Active" },
};

function Directory() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [searched, setSearched] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const key = certId.trim().toUpperCase();
    setResult(sample[key] ?? { ok: false, id: key });
  };

  const onDownload = async () => {
    if (!result?.ok) return;
    setDownloading(true);
    try {
      await downloadCertificatePdf({
        id: result.id,
        holder: result.holder!,
        scope: result.scope!,
        issued: result.issued!,
        expires: result.expires!,
        status: result.status!,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Public Registry"
        title={<>Accredited <span className="text-gold">Directory</span></>}
        description="Search our global directory of accredited certification bodies, certified auditors, and approved training providers."
      />

      <section className="py-12 bg-white">
        <div className="container-x">
          {/* Certificate Verification Section */}
          <div className="mb-8">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg">
              <label className="text-xs font-semibold uppercase tracking-wider text-primary">Certificate ID</label>
              <div className="mt-3 grid sm:grid-cols-[1fr_auto] gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. IUCB-ACB-0421"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-border bg-white font-mono text-navy focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <button type="submit" className="px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary transition">
                  Verify Certificate
                </button>
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><QrCode className="h-4 w-4 text-secondary" /> Or scan the QR code on your certificate</div>
                <span>•</span>
                <span>Try: IUCB-ACB-0421</span>
              </div>
            </form>

            {searched && result && (
              <div className="mt-8">
                {result.ok ? (
                  <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
                    <div className="bg-primary text-primary-foreground p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gold text-gold-foreground grid place-items-center">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-gold">Verified</div>
                          <div className="font-semibold">Valid IUCB Credential</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-gold text-gold-foreground rounded-full">
                        <BadgeCheck className="h-3.5 w-3.5" /> {result.status}
                      </span>
                    </div>
                    <div className="bg-white p-6 md:p-8 grid sm:grid-cols-2 gap-6">
                      <Field icon={Building2} label="Credential Holder" value={result.holder!} />
                      <Field icon={FileCheck2} label="Certificate ID" value={result.id} mono />
                      <Field icon={ShieldCheck} label="Scope" value={result.scope!} />
                      <Field icon={Calendar} label="Validity" value={`${result.issued} → ${result.expires}`} />
                    </div>
                    <div className="bg-soft-gray border-t border-border p-5 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="text-xs text-muted-foreground">
                        Cryptographically signed · Verifiable via QR · Listed in the IUCB public registry.
                      </div>
                      <button
                        onClick={onDownload}
                        disabled={downloading}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gold text-gold-foreground font-semibold hover:brightness-95 transition disabled:opacity-70"
                      >
                        {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        {downloading ? "Generating PDF…" : "Download Certified Ledger PDF"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-navy">No credential found for "{result.id}"</div>
                      <p className="mt-1 text-sm text-muted-foreground">Please re-check the ID or contact verifications@iucb.org. Counterfeit certificates can be reported confidentially.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Directory Listing */}
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.map((e) => {
              const Icon = iconFor(e.type);
              return (
                <article key={e.id} className="rounded-xl border border-border bg-white p-6 hover:border-secondary hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-md bg-light-blue text-primary grid place-items-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-secondary bg-light-blue/50 px-2 py-1 rounded">
                      <BadgeCheck className="h-3 w-3" /> Active
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy">{e.name}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{e.type}</div>
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-navy">
                    <MapPin className="h-3.5 w-3.5 text-secondary" /> {e.country}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.standards.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-1 bg-soft-gray rounded text-primary">{s}</span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground">{e.id}</span>
                    <button className="text-xs font-semibold text-secondary hover:text-primary">View →</button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ icon: Icon, label, value, mono }: { icon: typeof ShieldCheck; label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className={`mt-1.5 text-navy font-semibold ${mono ? "font-mono text-sm" : ""}`}>{value}</div>
    </div>
  );
}
