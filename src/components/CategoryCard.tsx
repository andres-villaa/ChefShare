import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  variant: "primary" | "accent";
}

const CategoryCard = ({ name, icon: Icon, variant }: CategoryCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes?category=${encodeURIComponent(name)}`);
  };
  return (
    <button
      className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center aspect-square w-full min-h-[140px] max-h-[180px] ${
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-accent text-accent-foreground"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className="h-10 w-10" />
        <span className="font-semibold text-lg">{name}</span>
      </div>
    </button>
  );
};

export default CategoryCard;
