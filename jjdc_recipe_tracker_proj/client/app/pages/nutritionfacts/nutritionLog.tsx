import { TextField, Box, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { getCurrentUserID } from '../../services/sessions.server';

export async function loader({ request }: { request: Request }) {
    const currUser = await getCurrentUserID(request);
    return currUser ? currUser : "aabrahmovicio6";
}

interface Recipe {
    id: number;
    name: string;
}

function NutritionLogPage() {
    const userID: string = useLoaderData();
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (query.length > 0) {
            fetchRecipes(query);
        } else {
            setRecipes([]);
        }
    }, [query]);

    const fetchRecipes = async (searchTerm: string) => {
        try {
            const response = await axios.get('http://localhost:3007/api/balancebites/search/recipes', {
                params: { searchTerm, userID },
            });
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleRecipeSelect = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleAddNutritionLog = async () => {
        if (!selectedRecipe) {
            alert('Please select a recipe first.');
            return;
        }

        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            await axios.post('http://localhost:3007/api/balancebites/nutritionlog', {
                UserID: userID,
                Time: currentTime,
                RecipeID: selectedRecipe.id,
            });

            setSuccessMessage('Log Added!');
            setSelectedRecipe(null); // Clear after success
            setQuery('');
            setRecipes([]);
        } catch (error) {
            console.error('Error adding nutrition log:', error);
            alert('Error adding nutrition log');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={4} width="100%">
            <Typography variant="h4" mb={4}>Add Nutrition Log</Typography>

            <TextField
                label="Search Recipes"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                sx={{ maxWidth: 400, mb: 2 }}
            />

            {recipes.length > 0 && (
                <Box width="100%" maxWidth={400} mb={2}>
                    {recipes.map((recipe) => (
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
                                onClick={() => handleRecipeSelect(recipe)}
                                sx={{
                                    mt: 1,
                                    backgroundColor: '#82ca9d',
                                    '&:hover': { backgroundColor: '#6fa179' },
                                }}
                            >
                                {selectedRecipe?.id === recipe.id ? 'Selected' : 'Select'}
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}

            {selectedRecipe && (
                <Box mt={2} mb={2}>
                    <Typography>Selected Recipe: <strong>{selectedRecipe.name}</strong></Typography>
                </Box>
            )}

            <Button
                variant="contained"
                onClick={handleAddNutritionLog}
                disabled={!selectedRecipe}
                sx={{
                    backgroundColor: '#82ca9d',
                    '&:hover': { backgroundColor: '#6fa179' },
                }}
            >
                Add to Nutrition Log
            </Button>

            {successMessage && (
                <Typography color="green" mt={2}>{successMessage}</Typography>
            )}
        </Box>
    );
}

export default NutritionLogPage;
