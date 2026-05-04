import { Shield, Award, Users, Target } from "lucide-react";

export default function About() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-primary text-center">About Us</h1>
      <p className="font-hindi text-center text-xl text-muted-foreground mt-2">हमारे बारे में</p>

      <div className="mt-10 bg-card border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-lg bg-accent/15 text-accent grid place-items-center">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Who We Are</h2>
        </div>
        <div className="space-y-4 text-foreground/85 leading-relaxed">
          <p><strong>Tax Suvidha Jan Kendra</strong> is a government-authorized service center dedicated to providing reliable, legal and transparent tax and government services to citizens across India. We believe every citizen deserves easy access to essential services without bureaucratic hassle.</p>
          <p>Our team of experienced professionals ensures that your GST registration, income tax filing, PAN card services, and Aadhaar-related work is completed accurately, on time, and at affordable prices.</p>
          <p>Under the Government of India's Digital India initiative, we support citizens and businesses with fast, transparent and technology-driven tax and documentation services.</p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {[
          { icon: Award, title: "Government Authorized", text: "Recognized service center for citizen services." },
          { icon: Users, title: "10,000+ Customers", text: "Trusted by individuals and businesses." },
          { icon: Target, title: "On-Time Delivery", text: "Fast turnaround for every service request." },
        ].map((c) => (
          <div key={c.title} className="bg-card border rounded-xl p-6 text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 text-primary grid place-items-center">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold mt-3">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
