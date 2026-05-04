import { FileText, Receipt, CreditCard, Building2, Globe, Palette, Image, IdCard, Briefcase, Calculator, FileSignature, ShoppingBag, Megaphone, MonitorSmartphone, BadgeCheck, Banknote, BookOpen, Camera } from "lucide-react";

export const SERVICES = [
  { id: "gst", title: "GST Registration & Filing", desc: "New GST registration aur monthly/quarterly returns.", icon: Receipt },
  { id: "itr", title: "Income Tax Return (ITR)", desc: "Salaried, business, freelancer ITR filing.", icon: FileText },
  { id: "pan", title: "PAN Card Services", desc: "New PAN, correction, duplicate PAN.", icon: CreditCard },
  { id: "aadhaar", title: "Aadhaar Services", desc: "Update name, address, mobile, photo.", icon: IdCard },
  { id: "biz", title: "Business Registration", desc: "Proprietorship, Partnership, Pvt Ltd, LLP.", icon: Building2 },
  { id: "msme", title: "MSME / Udyam Registration", desc: "Get government recognition for your business.", icon: BadgeCheck },
  { id: "acc", title: "Accounting & Bookkeeping", desc: "Monthly accounts, ledgers, balance sheet.", icon: Calculator },
  { id: "tds", title: "TDS Return Filing", desc: "Quarterly TDS returns with Form 16/16A.", icon: Banknote },
  { id: "fssai", title: "FSSAI License", desc: "Food business license registration.", icon: ShoppingBag },
  { id: "web", title: "Website Design & Development", desc: "Professional business websites.", icon: Globe },
  { id: "logo", title: "Logo Design", desc: "Custom brand logos.", icon: Palette },
  { id: "banner", title: "Banner & Poster Design", desc: "Social media & print banners.", icon: Image },
  { id: "card", title: "Visiting Card Design", desc: "Premium digital and print visiting cards.", icon: FileSignature },
  { id: "social", title: "Social Media Marketing", desc: "Instagram, Facebook page management.", icon: Megaphone },
  { id: "ecom", title: "E-commerce Setup", desc: "Online shop & payment gateway setup.", icon: MonitorSmartphone },
  { id: "agree", title: "Agreement & Affidavit", desc: "Rent, partnership, NOC drafting.", icon: BookOpen },
  { id: "photo", title: "Photo Editing & Printing", desc: "Passport photos, ID prints.", icon: Camera },
  { id: "other", title: "Other Government Services", desc: "Birth certificate, ration card, etc.", icon: Briefcase },
];
