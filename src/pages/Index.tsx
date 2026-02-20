import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TaxCalculator from "@/components/TaxCalculator";
import CustomerForm from "@/components/CustomerForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TaxCalculator />
        <CustomerForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
