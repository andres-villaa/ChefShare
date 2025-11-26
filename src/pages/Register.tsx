import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import herbsImage from "@/assets/herbs-login.jpg";

const Register = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    const result = await register(formData.username, formData.email, formData.password);

    if (result.success) {
      toast({
        title: "Cuenta creada exitosamente",
        description: "Bienvenido a ChefShare",
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: result.message || "Error al registrarse",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-card rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block relative">
          <img src={herbsImage} alt="Fresh herbs" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#F5EFE7] p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Regístrate en ChefShare</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">Nombre de Usuario</Label>
                <Input id="username" type="text" placeholder="tu_nombre" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className="bg-white" />
              </div>
              <Button type="submit" className="w-full">Registrarse</Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">¿Ya tienes una cuenta? <Link to="/login" className="text-foreground font-medium hover:underline">Inicia Sesión aquí.</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
