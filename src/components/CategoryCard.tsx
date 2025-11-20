import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  variant: "primary" | "accent";
}

const CategoryCard = ({ name, icon: Icon, variant }: CategoryCardProps) => {
  return (
    <button
      className={`group relative overflow-hidden rounded-lg p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-accent text-accent-foreground"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className="h-10 w-10" />
        <span className="font-semibold text-lg">{name}</span>
      </div>
    </button>
  );
};

export default CategoryCard;
