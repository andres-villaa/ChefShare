import RecipeCard from "./RecipeCard";

const FeaturedRecipes = () => {
  const recipes = [
    {
      id: 1,
      title: "Pasta Carbonara Auténtica",
      author: "María González",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
      cookTime: "30 min",
      difficulty: "Media",
      likes: 245,
      rating: 4.8
    },
    {
      id: 2,
      title: "Tacos al Pastor Tradicionales",
      author: "Carlos Ramírez",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
      cookTime: "45 min",
      difficulty: "Fácil",
      likes: 892,
      rating: 4.9
    },
    {
      id: 3,
      title: "Tiramisú Italiano Clásico",
      author: "Sofia Rossi",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
      cookTime: "20 min",
      difficulty: "Fácil",
      likes: 567,
      rating: 4.7
    },
    {
      id: 4,
      title: "Paella Valenciana de Mariscos",
      author: "Juan Martínez",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
      cookTime: "60 min",
      difficulty: "Difícil",
      likes: 423,
      rating: 4.9
    },
    {
      id: 5,
      title: "Sushi Rolls Variados",
      author: "Yuki Tanaka",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
      cookTime: "40 min",
      difficulty: "Media",
      likes: 734,
      rating: 4.6
    },
    {
      id: 6,
      title: "Croissants Franceses Caseros",
      author: "Pierre Dubois",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
      cookTime: "90 min",
      difficulty: "Difícil",
      likes: 312,
      rating: 4.8
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Recetas Destacadas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora las recetas más populares de nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
