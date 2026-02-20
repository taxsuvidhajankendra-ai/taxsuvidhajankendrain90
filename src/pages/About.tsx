import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Users, Award, Target } from "lucide-react";
import { motion } from "framer-motion";

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About Us</h1>
          <p className="text-lg opacity-80">Your trusted partner for tax & government services</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card rounded-xl border border-border shadow-card p-8 mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Tax Suvidha Jan Kendra</strong> is a government-authorized service center dedicated to providing reliable, legal and transparent tax and government services to citizens across India. We believe every citizen deserves easy access to essential services without bureaucratic hassle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of experienced professionals ensures that your GST registration, income tax filing, PAN card services, and Aadhaar-related work is completed accurately, on time, and at affordable prices.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              { icon: Shield, title: "Trust & Security", desc: "Your data is encrypted and secure. We follow strict data protection guidelines." },
              { icon: Users, title: "10,000+ Clients", desc: "Trusted by thousands of individuals and businesses across India." },
              { icon: Award, title: "Expert Team", desc: "Certified tax professionals and government service experts." },
              { icon: Target, title: "Our Mission", desc: "To make tax compliance simple, affordable and accessible for every Indian." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border shadow-card p-6"
              >
                <item.icon className="h-8 w-8 text-secondary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
