import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Users, GraduationCap, CheckCircle2, ArrowRight, FileText, Award, Download } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Accreditation Services — IUCB" },
      {
        name: "description",
        content:
          "Explore IUCB accreditation services for Certification Bodies, Individual Auditors, and Training Providers through internationally recognized accreditation programs.",
      },
    ],
  }),
  component: Services,
});

const tabs = [
  { id: "cb", label: "Certification Bodies", icon: Building2 },
  { id: "auditors", label: "Individual Auditors", icon: Users },
  { id: "training", label: "Training Providers", icon: GraduationCap },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ctaContent: Record<TabId, {
  badge: string;
  heading: string;
  description: string;
  primaryButton: { text: string; link: string };
  secondaryButton: { text: string; link: string };
}> = {
  cb: {
    badge: "GET STARTED",
    heading: "Begin Your Accreditation Journey with IUCB",
    description: "Our accreditation specialists are ready to guide your Certification Body through the accreditation process and help you achieve internationally recognized accreditation.",
    primaryButton: { text: "Apply for Accreditation", link: "/contact" },
    secondaryButton: { text: "Application Kit", link: "/documentation" },
  },
  auditors: {
    badge: "GET CERTIFIED",
    heading: "Become an IUCB Accredited Auditor",
    description: "Demonstrate your professional competence and gain international recognition through IUCB Auditor Accreditation. Our experts will guide you through eligibility, assessment, documentation, and certification.",
    primaryButton: { text: "Apply as Auditor", link: "/contact" },
    secondaryButton: { text: "Auditor Guide", link: "/documentation" },
  },
  training: {
    badge: "START TODAY",
    heading: "Accredit Your Training Organization",
    description: "Enhance the credibility of your training institution through IUCB accreditation. Meet international quality standards and build global trust with expert guidance throughout the accreditation process.",
    primaryButton: { text: "Apply as Training Provider", link: "/contact" },
    secondaryButton: { text: "Training Provider Guide", link: "/documentation" },
  },
};

const content: Record<TabId, {
  badge: string; title: string; intro: string;
  benefits: string[]; eligibility: string[]; standards: string[];
  extra?: { heading: string; rows: { tier: string; experience: string; req: string }[] };
}> = {
  cb: {
    badge: "Certification Body Accreditation",
    title: "Certification Bodies",
    intro:
      "IUCB accredits Certification Bodies that demonstrate competence, impartiality, and consistency in auditing and certifying organizations against internationally recognized standards. Accreditation strengthens market confidence, regulatory acceptance, and global recognition.",

    benefits: [
      "Internationally recognized accreditation framework",
      "Enhanced credibility with regulators, clients, and stakeholders",
      "Listing in the official IUCB Accredited Directory",
      "Greater confidence through independent third-party assessment",
    ],

    eligibility: [
      "Legally established Certification Body",
      "Documented management system and operational procedures",
      "Competent and qualified audit personnel",
      "Demonstrated impartiality, independence, and compliance with IUCB requirements",
    ],

    standards: [
      "ISO/IEC 17021-1",
      "ISO/IEC 17065",
      "ISO/IEC 17024",
      "ISO/IEC 17020",
    ],
  },
  auditors: {
    badge: "Individual Auditor Accreditation",

    title: "Individual Auditors",

    intro:
      "IUCB recognizes competent auditing professionals through internationally accredited certification pathways. Auditor accreditation validates technical expertise, practical experience, and professional competence while supporting career progression across globally recognized standards.",

    benefits: [
      "Globally recognized professional credential",
      "Listing in the official IUCB Auditor Directory",
      "Structured career progression through accreditation levels",
      "Enhanced professional credibility and international recognition",
    ],

    eligibility: [
      "Relevant education or equivalent professional experience",
      "Completion of approved auditor training",
      "Demonstrated audit knowledge and practical experience",
      "Successful completion of the required competency assessment",
    ],

    standards: [
      "ISO 19011",
      "ISO 9001 Lead Auditor",
      "ISO/IEC 27001 Lead Auditor",
      "ISO 14001 Lead Auditor",
    ],

    extra: {
      heading: "Auditor Accreditation Levels",

      rows: [
        {
          tier: "Associate Auditor",
          experience: "Entry Level",
          req: "Approved Training + Competency Assessment",
        },
        {
          tier: "Internal Auditor",
          experience: "Basic Experience",
          req: "Training + Practical Audit Experience",
        },
        {
          tier: "Lead Auditor",
          experience: "Professional",
          req: "Lead Audit Experience + Competency Validation",
        },
        {
          tier: "Principal Auditor",
          experience: "Senior Expert",
          req: "Extensive Audit Leadership & Professional Excellence",
        },
      ],
    },
  },
  training: {
    badge: "Training Provider Accreditation",

    title: "Training Providers",

    intro:
      "IUCB accredits Training Providers that deliver high-quality education, professional development, and competency-based learning. Accreditation confirms that training programs, instructors, and assessment processes meet internationally recognized quality standards.",

    benefits: [
      "International recognition for accredited training programs",
      "Official listing in the IUCB Training Provider Directory",
      "Authority to deliver IUCB-recognized training programs",
      "Enhanced credibility for learners, organizations, and industry partners",
    ],

    eligibility: [
      "Documented training curriculum aligned with international standards",
      "Qualified instructors with relevant industry expertise",
      "Transparent examination and assessment methodology",
      "Appropriate physical or online learning infrastructure",
    ],

    standards: [
      "ISO 21001",
      "ISO 29993",
      "IUCB Training Requirements",
    ],
  },
};

function Services() {
  const [active, setActive] = useState<TabId>("cb");
  const c = content[active];
  const cta = ctaContent[active];

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-16 md:py-20">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Accreditation Services
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            Tailored Accreditation Pathways
          </h1>

          <p className="mt-5 max-w-2xl text-white/80 text-lg">
            Whether you are a Certification Body, an Individual Auditor, or a
            Training Provider, IUCB offers internationally recognized
            accreditation programs designed to strengthen competence,
            credibility, and global recognition.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-x">
          <div className="inline-flex bg-soft-gray rounded-lg p-1.5 gap-1 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition ${active === t.id ? "bg-primary text-primary-foreground shadow" : "text-navy hover:bg-white"
                  }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">{c.badge}</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-navy">{c.title}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{c.intro}</p>

              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-navy flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> Program Benefits</h3>
                  <ul className="mt-4 space-y-2.5">
                    {c.benefits.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-navy"><CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-navy flex items-center gap-2"><FileText className="h-4 w-4 text-gold" /> Eligibility Requirements</h3>
                  <ul className="mt-4 space-y-2.5">
                    {c.eligibility.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-navy"><CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border p-6 bg-soft-gray">
                <h3 className="font-semibold text-navy"> Applicable Standards</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.standards.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white border border-border rounded-md text-xs font-mono text-primary">{s}</span>
                  ))}
                </div>
              </div>

              {c.extra && (
                <div className="mt-6 rounded-xl border border-border overflow-hidden">
                  <div className="bg-soft-gray px-6 py-4 font-semibold text-navy">{c.extra.heading}</div>
                  <table className="w-full text-sm">
                    <thead className="bg-white border-b border-border">
                      <tr className="text-left">
                        <th className="px-6 py-3 font-semibold text-navy">Accreditation Level</th>
                        <th className="px-6 py-3 font-semibold text-navy">Experience Level</th>
                        <th className="px-6 py-3 font-semibold text-navy">Qualification Requirements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.extra.rows.map((r) => (
                        <tr key={r.tier} className="border-b border-border last:border-0">
                          <td className="px-6 py-3.5 font-semibold text-secondary">{r.tier}</td>
                          <td className="px-6 py-3.5 text-navy">{r.experience}</td>
                          <td className="px-6 py-3.5 text-muted-foreground">{r.req}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div 
                key={active}
                className="sticky top-28 rounded-2xl bg-primary text-primary-foreground p-8 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
                <div className="relative">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                    {cta.badge}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold">
                    {cta.heading}
                  </h3>

                  <p className="mt-3 text-sm text-white/75">
                    {cta.description}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link to={cta.primaryButton.link} className="flex items-center justify-center gap-2 px-5 py-3 bg-gold text-gold-foreground rounded-md font-semibold text-sm hover:brightness-105 transition">
                      {cta.primaryButton.text} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to={cta.secondaryButton.link} className="flex items-center justify-center gap-2 px-5 py-3 border border-white/30 rounded-md text-sm font-semibold hover:bg-white/10 transition">
                      <Download className="h-4 w-4" /> {cta.secondaryButton.text}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border p-6 bg-light-blue/40">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary"> Accreditation Lifecycle</div>
                <p className="mt-2 text-sm text-navy leading-relaxed">
                   IUCB accreditation remains valid through periodic surveillance and reassessment, ensuring continual compliance, competence, and alignment with internationally recognized accreditation requirements.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
