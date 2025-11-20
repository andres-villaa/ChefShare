import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedRecipes />
      <Categories />
      <Footer />
    </div>
  );
};

export default Index;
