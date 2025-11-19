'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecipeCard } from '@/components/recipe-card';
import { getRecipes, getUserById } from '@/lib/fake-api';
import { useAuth } from '@/lib/auth-context';
import { Plus, Search } from 'lucide-react';
import type { Recipe } from '@/lib/fake-api';

export default function RecipesPage() {
  const { isAuthenticated } = useAuth();
  const [recipes, setRecipes] = useState<Array<Recipe & { authorName: string }>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<Recipe & { authorName: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        
        // Get author names
        const recipesWithAuthors = await Promise.all(
          data.map(async (recipe) => {
            const author = await getUserById(recipe.authorId);
            return {
              ...recipe,
              authorName: author?.name || 'Unknown'
            };
          })
        );
        
        setRecipes(recipesWithAuthors);
        setFilteredRecipes(recipesWithAuthors);
      } catch (error) {
        console.error('[v0] Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRecipes();
  }, []);
  
  useEffect(() => {
    let filtered = recipes;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter);
    }
    
    setFilteredRecipes(filtered);
  }, [searchQuery, categoryFilter, recipes]);
  
  const categories = ['all', ...Array.from(new Set(recipes.map(r => r.category)))];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Recipes</h1>
          <p className="text-muted-foreground">Discover delicious recipes from our community</p>
        </div>
        
        {isAuthenticated && (
          <Link href="/recipes/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Recipe
            </Button>
          </Link>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading recipes...</p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recipes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              category={recipe.category}
              imageUrl={recipe.imageUrl}
              authorName={recipe.authorName}
              likeCount={recipe.likeCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
