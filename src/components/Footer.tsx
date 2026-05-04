import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Shield } from "lucide-react";
import { BRAND } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center">
              <Shield className="h-5 w-5" />
            </div>
            <div className="font-bold text-lg">{BRAND.name}</div>
          </div>
          <p className="text-sm text-primary-foreground/80">
            Government-authorized service center for GST, ITR, PAN, Aadhaar and digital services across India.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/booking" className="hover:text-accent">Book a Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a></li>
            {BRAND.emails.map((e) => (
              <li key={e} className="flex items-center gap-2 break-all"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${e}`}>{e}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <Link to="/admin" className="inline-block mt-6 text-xs text-primary-foreground/50 hover:text-accent">
            🛡️ Admin
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 text-center text-xs text-primary-foreground/70">
          © 2026 Tax Suvidha Jan Kendra. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
