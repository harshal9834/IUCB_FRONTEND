import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/not-found")({
  component: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-[#0F2942] tracking-widest">404</h1>
      <div className="bg-[#D4AF37] px-2 text-sm rounded rotate-12 absolute mb-28 text-[#0F2942] font-semibold">
        Page Not Found
      </div>
      <p className="text-slate-500 text-lg mt-6 max-w-md">
        The link you requested may be broken, or the page has been permanently relocated.
      </p>
      <div className="flex gap-4 mt-8">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2942] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Go to Login
        </a>
      </div>
    </div>
  );
}
