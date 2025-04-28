import { TextField, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 

function SimpleRecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<{ id: number; name: string }[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [mealPlanName, setMealPlanName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [userID] = useState('aabrahmovicio6');
  const [selectedRecipeNames, setSelectedRecipeNames] = useState<Map<number, string>>(new Map());
  const fetchRecipes = async (searchTerm: string) => {
    try {
      const response = await axios.get('http://localhost:3007/api/balancebites/search/recipes', {
        params: { searchTerm, userID }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  useEffect(() => {
    if (query.length > 0) {
      fetchRecipes(query);
    } else {
      setRecipes([]);
    }
  }, [query]);
  const handleButtonClick = useCallback((recipeId: number) => {
    setSelectedRecipes((prevSelected) => {
      const isSelected = prevSelected.includes(recipeId);
      const updatedRecipes = isSelected
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId];

        const updatedRecipeNames = new Map(selectedRecipeNames); 
      if (isSelected) {
        updatedRecipeNames.delete(recipeId);
      } else {
        const recipe = recipes.find((r) => r.id === recipeId);
        if (recipe) {
          updatedRecipeNames.set(recipeId, recipe.name);
        }
      }
        setSelectedRecipeNames(updatedRecipeNames);
      return updatedRecipes;
    });
  }, [recipes]);
  const handleMealPlanCreation = async () => {
    try {
      console.log('Creating meal plan with name:', mealPlanName, 'and visibility:', isPublic);
      console.log('Number of recipes:', selectedRecipes.length);
      await axios.post('http://localhost:3007/api/balancebites/meal', {
        userID,
        name: mealPlanName,
        isPublic,
        recipes: selectedRecipes,
      });
      alert('Created meal plan successfully!');
    } catch (error) {
      console.error('Error creating meal plan:', error);
      alert('Error creating meal plan');
    }
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" gap={3} p={4} width="100%">
      <Box flex={1} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        <TextField
          label="Meal Plan Name"
          variant="outlined"
          value={mealPlanName}
          onChange={(e) => setMealPlanName(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic} 
              onChange={(e) => setIsPublic(e.target.checked)} 
            />
          }
          label="Make this meal plan public"
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: '#82ca9d',
            '&:hover': {
              backgroundColor: '#6fa179',
            },
          }}
          onClick={handleMealPlanCreation}
          disabled={selectedRecipes.length === 0 || !mealPlanName}
        >
          Create Meal Plan
        </Button>
        <Box marginTop={2} width="100%" maxWidth={400}>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Box
                key={recipe.id}
                p={2}
                mb={1}
                border="1px solid #ccc"
                borderRadius="8px"
              >
                <Typography>{recipe.name}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#82ca9d',
                    '&:hover': {
                      backgroundColor: '#6fa179',
                    },
                  }}
                  onClick={() => handleButtonClick(recipe.id)}
                >
                  {selectedRecipes.includes(recipe.id) ? 'Remove from Meal Plan' : 'Add to Meal Plan'}
                </Button>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No recipes found.</Typography>
          )}
        </Box>
      </Box>

      <Box flex={1} display="flex" flexDirection="column" gap={2} mt={2}>
        {selectedRecipes.length > 0 ? (
          <Box width="100%" maxWidth={400}>
            <Typography variant="h6">Selected Recipes:</Typography>
            <Box>
              {Array.from(selectedRecipeNames.values()).map((recipeName, index) => (
                <Typography key={index}>{recipeName}</Typography>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography color="text.secondary">No recipes selected yet.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default SimpleRecipeSearch;