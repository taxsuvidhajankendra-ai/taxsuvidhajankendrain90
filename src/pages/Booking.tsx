import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/data/services";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "", mobile_number: "", email: "", city: "", service: "gst",
    description: "", consent: true,
  });

  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.mobile_number || !form.consent) {
      toast.error("कृपया नाम, मोबाइल नंबर भरें।");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("submissions" as any).insert({
      full_name: form.full_name,
      mobile_number: form.mobile_number,
      email: form.email || null,
      city: form.city || null,
      service: form.service,
      description: form.description || null,
      consent: form.consent,
      status: "new",
    });
    setLoading(false);
    if (error) {
      toast.error("Submission failed: " + error.message);
      return;
    }
    setDone(true);
    toast.success("Booking submitted successfully!");
  };

  if (done) {
    return (
      <div className="container py-20 max-w-xl text-center">
        <CheckCircle2 className="h-20 w-20 text-india mx-auto" />
        <h1 className="text-3xl font-bold mt-4 text-primary">धन्यवाद! Booking Received</h1>
        <p className="mt-3 text-muted-foreground">हमारी team जल्द ही आपसे संपर्क करेगी। आप हमें WhatsApp +91 98917 69507 पर भी मैसेज कर सकते हैं।</p>
        <button onClick={() => { setDone(false); setForm({ ...form, full_name: "", mobile_number: "", email: "", city: "", description: "" }); }} className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg">Book Another Service</button>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-primary text-center">Book a Service</h1>
      <p className="font-hindi text-center text-muted-foreground mt-2">सेवा बुक करें</p>

      <form onSubmit={submit} className="mt-8 bg-card border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <Field label="Full Name *" value={form.full_name} onChange={upd("full_name")} />
        <Field label="Mobile Number *" value={form.mobile_number} onChange={upd("mobile_number")} type="tel" />
        <Field label="Email" value={form.email} onChange={upd("email")} type="email" />
        <Field label="City" value={form.city} onChange={upd("city")} />

        <div>
          <label className="block text-sm font-medium mb-1">Select Service *</label>
          <select value={form.service} onChange={upd("service")} className="w-full px-3 py-2 border rounded-md bg-background">
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Describe your requirement</label>
          <textarea value={form.description} onChange={upd("description")} rows={4} className="w-full px-3 py-2 border rounded-md bg-background" />
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
          <span>I agree to be contacted regarding my service request.</span>
        </label>

        <button disabled={loading} className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Submit Booking
        </button>
      </form>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...rest} className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
