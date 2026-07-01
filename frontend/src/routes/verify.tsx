import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, QrCode, BadgeCheck, AlertCircle, Calendar, Building2, FileCheck2, Download, Loader2 } from "lucide-react";
import { PageHero } from "../components/page-hero";
import { downloadCertificatePdf } from "../lib/certificate-pdf";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Certificate — IUCB" },
      { name: "description", content: "Verify the authenticity of an IUCB accreditation or certification using your certificate ID or QR code." },
    ],
  }),
  component: Verify,
});

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

function Verify() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [searched, setSearched] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const key = id.trim().toUpperCase();
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
        eyebrow="Certificate Verification"
        title={<>Verify any <span className="text-gold">IUCB credential</span> in seconds</>}
        description="Confirm the authenticity, scope, and validity of an IUCB-issued accreditation or certification. Every credential is tamper-evident and traceable."
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg">
              <label className="text-xs font-semibold uppercase tracking-wider text-primary">Certificate ID</label>
              <div className="mt-3 grid sm:grid-cols-[1fr_auto] gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
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

            <div className="mt-12 grid sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, title: "Tamper-Evident", desc: "Cryptographic signatures on every credential." },
                { icon: QrCode, title: "QR Verification", desc: "Instant validation from any device." },
                { icon: BadgeCheck, title: "Public Registry", desc: "All credentials listed in the IUCB Directory." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border p-5 text-center">
                  <f.icon className="h-6 w-6 mx-auto text-secondary" />
                  <div className="mt-3 font-semibold text-navy text-sm">{f.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
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
