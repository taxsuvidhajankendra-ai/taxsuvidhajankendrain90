import { useState } from "react";
import { Send, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const serviceOptions = [
  "GST Registration",
  "GST Return Filing",
  "Income Tax Return (ITR)",
  "TDS Filing",
  "PAN Card Services",
  "Aadhaar Services",
  "Other",
];

const CustomerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    service: "",
    description: "",
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("Please agree to the data storage consent.");
      return;
    }
    // In production, this would save to Lovable Cloud
    setSubmitted(true);
    toast.success("Your request has been submitted! We'll contact you soon.");
  };

  if (submitted) {
    return (
      <section className="py-20 bg-background" id="book">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center bg-card rounded-2xl border border-border shadow-card p-10">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you, {formData.fullName}. We'll contact you at {formData.mobile} shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ fullName: "", mobile: "", email: "", city: "", service: "", description: "", consent: false }); }}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background" id="book">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-3">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Book a Service
          </h2>
          <p className="text-muted-foreground">Fill the form below and we'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-card p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mobile Number *</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                maxLength={15}
                pattern="[0-9]{10,15}"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                maxLength={255}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">City *</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Your city"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Select Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Choose a service...</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Upload Documents</label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload PDF, JPG, PNG files</span>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" multiple />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              placeholder="Briefly describe your requirement..."
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-input accent-secondary"
            />
            <span className="text-sm text-muted-foreground">
              I agree to store my data for service delivery purpose. Your data is safe and will not be shared.
            </span>
          </label>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-saffron-gradient text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <Send className="h-5 w-5" />
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomerForm;
