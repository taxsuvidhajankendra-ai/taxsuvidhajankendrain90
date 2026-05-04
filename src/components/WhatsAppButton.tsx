import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/utils";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hello Tax Suvidha Jan Kendra, I need help with a service.")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-semibold">WhatsApp</span>
    </a>
  );
}
