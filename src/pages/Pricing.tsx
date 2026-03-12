import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculator from "@/components/TaxCalculator";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Individual",
    nameHi: "व्यक्तिगत",
    features: ["ITR Filing (Salaried)", "PAN-Aadhaar Linking", "Basic Tax Planning", "Email Support"],
    popular: false,
  },
  {
    name: "Business",
    nameHi: "व्यवसाय",
    features: ["GST Registration", "Monthly GST Filing", "ITR Filing (Business)", "TDS Returns", "Dedicated Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    nameHi: "उद्यम",
    features: ["All Business Features", "Multiple GSTIN Support", "Audit Assistance", "Priority Processing", "Dedicated Manager"],
    popular: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Plans</h1>
          <p className="text-lg opacity-80">Choose the right plan for your needs. Contact us for pricing.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-card rounded-2xl border shadow-card p-6 relative hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                  pkg.popular ? "border-secondary ring-2 ring-secondary/20" : "border-border"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-saffron-gradient text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                <p className="text-sm font-hindi text-muted-foreground mb-6">{pkg.nameHi}</p>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 ${
                    pkg.popular
                      ? "bg-saffron-gradient text-primary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  Contact for Pricing
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TaxCalculator />
    </main>
    <Footer />
  </div>
);

export default Pricing;
