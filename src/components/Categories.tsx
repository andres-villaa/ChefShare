import { Cake, Coffee, Salad, Pizza, IceCream, Soup } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Categories = () => {
  const categories = [
    { name: "Postres", icon: Cake, color: "text-primary", count: 1234 },
    { name: "Bebidas", icon: Coffee, color: "text-secondary", count: 567 },
    { name: "Ensaladas", icon: Salad, color: "text-primary", count: 890 },
    { name: "Pizzas", icon: Pizza, color: "text-secondary", count: 456 },
    { name: "Helados", icon: IceCream, color: "text-primary", count: 234 },
    { name: "Sopas", icon: Soup, color: "text-secondary", count: 678 }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Categorías Populares
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre recetas organizadas por tus categorías favoritas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className={`${category.color} p-4 bg-muted rounded-full group-hover:bg-primary/10 transition-colors`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} recetas
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
