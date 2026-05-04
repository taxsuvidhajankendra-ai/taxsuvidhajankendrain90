import { Link } from "react-router-dom";
import { Shield, CheckCircle2, FileText, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { SERVICES } from "@/data/services";

export default function Home() {
  const [q, setQ] = useState("");
  return (
    <>
      <section className="gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="container py-20 md:py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="h-4 w-4" /> Trusted by 10,000+ Customers
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Reliable, Legal &amp; <span className="text-accent">Transparent</span> Services
          </h1>
          <p className="font-hindi text-xl md:text-2xl mt-3 opacity-90">भरोसेमंद, कानूनी और पारदर्शी सेवाएँ</p>
          <p className="mt-6 max-w-2xl mx-auto text-primary-foreground/85">
            Your one-stop solution for GST, Income Tax, PAN, Aadhaar, Website Design &amp; all government services.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {["Fast Processing", "Government Authorized", "100% Secure"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" />{t}</span>
            ))}
          </div>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search GST, ITR, PAN, Aadhaar services..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90">
              <FileText className="h-4 w-4" /> Our Services
            </Link>
            <Link to="/booking" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-white/20">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-primary">Popular Services</h2>
          <p className="text-center text-muted-foreground mt-2">Choose from 18+ government and digital services</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => !q || s.title.toLowerCase().includes(q.toLowerCase())).slice(0, 9).map((s) => (
              <Link key={s.id} to="/booking" className="group p-6 bg-card border rounded-xl hover:shadow-lg hover:border-accent transition">
                <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm text-primary font-semibold group-hover:gap-2 gap-1 transition-all">
                  Book Now <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="container grid md:grid-cols-3 gap-6 text-center">
          {[
            { n: "10,000+", l: "Happy Customers" },
            { n: "18+", l: "Services Offered" },
            { n: "100%", l: "Secure & Compliant" },
          ].map((x) => (
            <div key={x.l} className="p-8 bg-card rounded-xl border">
              <div className="text-4xl font-extrabold text-accent">{x.n}</div>
              <div className="text-muted-foreground mt-1">{x.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
