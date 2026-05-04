import { NavLink, Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background border-b shadow-sm">
      <div className="tricolor-bar h-1.5 w-full" />
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">
            <Shield className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-primary">Tax Suvidha</div>
            <div className="text-xs text-muted-foreground">Jan Kendra</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center bg-accent text-accent-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Book Now
          </Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t bg-background">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn("block px-4 py-3 border-b", isActive && "bg-secondary text-primary font-semibold")
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)} className="block px-4 py-3 bg-accent text-accent-foreground font-semibold text-center">
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
