import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CreateRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const categories = [
    "Desayuno",
    "Almuerzo",
    "Cena",
    "Postres",
    "Vegetariano",
    "Vegano"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Debes iniciar sesión', variant: 'destructive' });
      return;
    }
    // basic validation
    if (!title.trim()) {
      toast({ title: 'Título requerido', variant: 'destructive' });
      return;
    }

    const record = {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.split('\n').map((s) => s.trim()).filter(Boolean),
      steps: steps.split('\n').map((s) => s.trim()).filter(Boolean),
      image_url: imageUrl || null,
      category: category || null,
      author_id: user.id,
      author_name: user.username || user.email || null,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('recipes').insert([record]).select().single();
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Receta publicada' });
    // navigate to recipe detail
    navigate(`/recipe/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Publicar nueva receta</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>
          <div>
            <Label htmlFor="ingredients">Ingredientes (una por línea)</Label>
            <Textarea id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={4} />
          </div>
          <div>
            <Label htmlFor="steps">Instrucciones (una por línea)</Label>
            <Textarea id="steps" value={steps} onChange={(e) => setSteps(e.target.value)} rows={6} />
          </div>
          <div>
            <Label htmlFor="imageUrl">URL de la imagen</Label>
            <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <div className="flex gap-6 py-2">
              {categories.map(cat => (
                <label key={cat} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="appearance-none w-5 h-5 border-2 border-orange-500 rounded-full checked:bg-orange-500 checked:border-orange-500 focus:outline-none mb-1"
                    required
                  />
                  <span className="text-base font-semibold text-foreground">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Button type="submit">Publicar receta</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
