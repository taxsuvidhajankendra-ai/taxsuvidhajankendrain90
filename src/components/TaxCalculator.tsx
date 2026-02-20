import { useState } from "react";
import { Calculator } from "lucide-react";

const serviceRates: Record<string, number> = {
  "GST Registration": 1500,
  "GST Return Filing (Monthly)": 800,
  "GST Return Filing (Quarterly)": 2000,
  "Income Tax Return (Salaried)": 500,
  "Income Tax Return (Business)": 1500,
  "TDS Filing": 1000,
  "PAN Card (New)": 200,
  "PAN Card (Correction)": 150,
  "Aadhaar Update": 100,
  "Aadhaar-PAN Linking": 100,
};

const TaxCalculator = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const total = selected.reduce((sum, s) => sum + (serviceRates[s] || 0), 0);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-3">
            <Calculator className="inline h-4 w-4 mr-1" />
            Instant Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Estimate Your Cost
          </h2>
          <p className="text-muted-foreground">Select services to get an instant cost estimate</p>
        </div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {Object.entries(serviceRates).map(([service, rate]) => (
              <button
                key={service}
                onClick={() => toggleService(service)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all ${
                  selected.includes(service)
                    ? "border-secondary bg-secondary/10 text-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                }`}
              >
                <span>{service}</span>
                <span className="font-semibold text-foreground">₹{rate}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Total</p>
              <p className="text-3xl font-bold text-foreground">
                ₹{total.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">*Prices are approximate & may vary</p>
            </div>
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg bg-saffron-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCalculator;
