'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputField } from '@/components/input-field';
import { AlertBanner } from '@/components/alert-banner';
import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/lib/auth-context';
import { createRecipe } from '@/lib/fake-api';
import { validateRequired } from '@/lib/validators';
import { sanitizeInput, sanitizeArray } from '@/lib/sanitizer';

export default function CreateRecipePage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  
  const categories = ['Italian', 'Asian', 'Mexican', 'American', 'Dessert', 'Vegetarian', 'Other'];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const newErrors: { [key: string]: string } = {};
    
    const titleValidation = validateRequired(title, 'Title');
    const categoryValidation = validateRequired(category, 'Category');
    const ingredientsValidation = validateRequired(ingredients, 'Ingredients');
    const stepsValidation = validateRequired(steps, 'Instructions');
    
    if (!titleValidation.isValid) newErrors.title = titleValidation.errors[0];
    if (!categoryValidation.isValid) newErrors.category = categoryValidation.errors[0];
    if (!ingredientsValidation.isValid) newErrors.ingredients = ingredientsValidation.errors[0];
    if (!stepsValidation.isValid) newErrors.steps = stepsValidation.errors[0];
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Sanitize inputs
      const sanitizedTitle = sanitizeInput(title);
      const sanitizedCategory = sanitizeInput(category);
      const ingredientsArray = ingredients.split('\n').filter(i => i.trim());
      const sanitizedIngredients = sanitizeArray(ingredientsArray);
      const sanitizedSteps = sanitizeInput(steps);
      const sanitizedImageUrl = imageUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(title)}`;
      
      const newRecipe = await createRecipe({
        title: sanitizedTitle,
        category: sanitizedCategory,
        ingredients: sanitizedIngredients,
        steps: sanitizedSteps,
        imageUrl: sanitizedImageUrl
      }, user.id);
      
      router.push(`/recipes/${newRecipe.id}`);
    } catch (error) {
      setErrors({ general: 'Failed to create recipe. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/recipes" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Recipes
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Recipe</CardTitle>
            <CardDescription>
              Share your culinary creation with the community
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <AlertBanner
                  type="error"
                  message={errors.general}
                  onClose={() => setErrors({})}
                />
              )}
              
              <InputField
                label="Recipe Title"
                id="title"
                value={title}
                onChange={setTitle}
                placeholder="e.g., Classic Spaghetti Carbonara"
                required
                error={errors.title}
              />
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
              
              <InputField
                label="Ingredients"
                id="ingredients"
                value={ingredients}
                onChange={setIngredients}
                placeholder="Enter each ingredient on a new line"
                required
                multiline
                rows={6}
                error={errors.ingredients}
              />
              
              <InputField
                label="Instructions"
                id="steps"
                value={steps}
                onChange={setSteps}
                placeholder="Describe the steps to make this recipe..."
                required
                multiline
                rows={8}
                error={errors.steps}
              />
              
              <InputField
                label="Image URL (optional)"
                id="imageUrl"
                value={imageUrl}
                onChange={setImageUrl}
                placeholder="https://example.com/image.jpg"
              />
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Creating...' : 'Create Recipe'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/recipes')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
