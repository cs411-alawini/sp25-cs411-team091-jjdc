
import React, {useState, useEffect} from 'react';
import { searchUserData, type User , type Recipe , type Ingredients, type Nutritions, searchRecipeData, getRecipeByID, getFoodsInRecipeByID, getNutritionsInRecipeByID, getMealPlanByID, type MealPlan, getRecipeByMealPlanID} from "../../services/services";
import IngredientList from '~/components/recipe/ingredientList';
import RecipeList from '~/components/recipe/recipeList'
import { Form, Input, numberInput } from '@heroui/react';
import { Link, useParams } from 'react-router';



export function SearchMealPlanPage(){
    console.log('in search meal plan page');

    const { MealPlanID } = useParams(); // Access RecipeID from the URL

    const [mealplan, setMealPlan] = useState<MealPlan | undefined>();
    const [mealRecipeData, setMealRecipeData] = useState<Recipe[]>([]);
    const [nutrition, setNutrition] = useState<Nutritions>();

    const [fetchNewRecipeData, setFetchNewRecipeData] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            // Fetch the Recipe data based on the ID
            const data = await getRecipeByMealPlanID(Number(MealPlanID));
            setMealRecipeData(data);
            // const ingdata = await getFoodsInRecipeByID(Number(MealPlanID));
            // setMealRecipeData(ingdata);
            // const nutritiondata = await getNutritionsInRecipeByID(Number(MealPlanID))
            // setNutrition(nutritiondata)
        };

        fetchRecipe();
    }, [MealPlanID]);

    // if (!mealplan) { return <></>; }
    // console.log(mealplan);
    // console.log(nutrition);
    console.log(mealRecipeData);

    return (
        <>
            <div className="overflow-hidden bg-white py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 lg:px-7">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <Link to="/recipe" className="text-grey-600 hover:underline">← Back to Recipe</Link>
                                <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Mealplan: #{MealPlanID}
                                </h1>
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                    Have a good meal!
                                </h2>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6 py-10 sm:py-15">
                <RecipeList recipeData={mealRecipeData} />
            </div>
            
        </>

    );
};

