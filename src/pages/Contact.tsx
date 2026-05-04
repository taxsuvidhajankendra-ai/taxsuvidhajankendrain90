import { Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/utils";

export default function Contact() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary text-center">Contact Us</h1>
      <p className="font-hindi text-center text-muted-foreground mt-2">संपर्क करें</p>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <a href={`tel:${BRAND.phone}`} className="bg-card border rounded-xl p-6 hover:shadow-lg hover:border-accent transition flex items-center gap-4">
          <Phone className="h-8 w-8 text-accent" />
          <div><div className="text-sm text-muted-foreground">Phone</div><div className="font-semibold">{BRAND.phone}</div></div>
        </a>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="bg-card border rounded-xl p-6 hover:shadow-lg hover:border-accent transition flex items-center gap-4">
          <MessageCircle className="h-8 w-8 text-[#25D366]" />
          <div><div className="text-sm text-muted-foreground">WhatsApp</div><div className="font-semibold">{BRAND.phone}</div></div>
        </a>
        {BRAND.emails.map((e) => (
          <a key={e} href={`mailto:${e}`} className="bg-card border rounded-xl p-6 hover:shadow-lg hover:border-accent transition flex items-center gap-4">
            <Mail className="h-8 w-8 text-primary shrink-0" />
            <div className="min-w-0"><div className="text-sm text-muted-foreground">Email</div><div className="font-semibold break-all">{e}</div></div>
          </a>
        ))}
        <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="bg-card border rounded-xl p-6 hover:shadow-lg hover:border-accent transition flex items-center gap-4">
          <Instagram className="h-8 w-8 text-pink-500" />
          <div><div className="text-sm text-muted-foreground">Instagram</div><div className="font-semibold">@taxsuvidhaofficial</div></div>
        </a>
        <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="bg-card border rounded-xl p-6 hover:shadow-lg hover:border-accent transition flex items-center gap-4">
          <Facebook className="h-8 w-8 text-blue-600" />
          <div><div className="text-sm text-muted-foreground">Facebook</div><div className="font-semibold">Tax Suvidha Jan Kendra</div></div>
        </a>
      </div>
    </div>
  );
}
