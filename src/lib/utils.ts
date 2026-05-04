import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = {
  name: "Tax Suvidha Jan Kendra",
  phone: "+91 98917 69507",
  whatsapp: "919891769507",
  emails: ["taxsuvdhajankendra@gmail.com", "infotaxsuvidhajankendra@gmail.com"],
  instagram: "https://www.instagram.com/taxsuvidhaofficial",
  facebook: "https://www.facebook.com/profile.php?id=61584777467827",
};
