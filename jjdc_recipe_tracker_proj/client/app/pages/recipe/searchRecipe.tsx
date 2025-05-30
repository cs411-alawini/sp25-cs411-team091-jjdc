
import React, {useState, useEffect} from 'react';
import { searchUserData, type User , type Recipe , type Ingredients, type Nutritions, searchRecipeData, getRecipeByID, getFoodsInRecipeByID, getNutritionsInRecipeByID} from "../../services/services";
import IngredientList from '~/components/recipe/ingredientList';
import { Form, Input, numberInput } from '@heroui/react';
import { Link, useParams } from 'react-router';



export function SearchRecipePage(){

    const { RecipeID } = useParams(); // Access RecipeID from the URL

    const [recipe, setRecipe] = useState<Recipe>({
        RecipeID: 0,
        Name: 'No',
        UserID: '',
        Public: false,
    });
    const [recipeIngData, setRecipeIngData] = useState<Ingredients[]>([]);
    const [nutrition, setNutrition] = useState<Nutritions>();

    const [fetchNewRecipeData, setFetchNewRecipeData] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            // Fetch the Recipe data based on the ID
            const data = await getRecipeByID(Number(RecipeID));
            setRecipe(data);
            const ingdata = await getFoodsInRecipeByID(Number(RecipeID));
            setRecipeIngData(ingdata);
            const nutritiondata = await getNutritionsInRecipeByID(Number(RecipeID))
            setNutrition(nutritiondata)
        };

        fetchRecipe();
    }, [RecipeID]);

    if (!recipe) { return <></>; }
    console.log(recipe);
    console.log(nutrition);

    return (
        <>
            <div className="overflow-hidden bg-white py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 lg:px-7">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <Link to="/recipe" className="text-grey-600 hover:underline">← Back to Recipe</Link>
                                <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Ingredients: #{RecipeID} {recipe?.Name}
                                </h1>
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                    Have a good meal!
                                </h2>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6 py-10 sm:py-15">
                <IngredientList ingredientData={recipeIngData} nutritionData={nutrition}/>
            </div>

            <div className="mt-6 py-10 sm:py-15">
                Calories: {nutrition?.sumCalories}, Fat: {nutrition?.sumFat}, Carbs: {nutrition?.sumCarbohydrates}, Protein: {nutrition?.sumProtein}
            </div>
            
        </>

    );
};



