import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Location from "@/components/Location";
import ProductsSection from "@/components/ProductsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Catálogo desde base de datos con revalidación (ISR): rápido y siempre fresco.
export const revalidate = 30;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
        <ProductsSection />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
