import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";

export default function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-primary text-center">Our Services</h1>
      <p className="font-hindi text-center text-muted-foreground mt-2">हमारी सेवाएँ</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
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
  );
}
