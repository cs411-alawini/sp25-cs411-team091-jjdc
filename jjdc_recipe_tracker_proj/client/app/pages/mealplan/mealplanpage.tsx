import React, { useState, useEffect } from "react";
// import SearchBar from "../../components/recipe/searchBar";
import SearchBar from "~/components/mealplan/searchBar";
import RecipeList from "../../components/recipe/recipeList";
import RecipeForm from "~/components/recipe/recipeForm";
import { searchUserData, type User , type Recipe , searchRecipeData, type MealPlan, getUserMealPlanByID} from "../../services/services";
import { useParams } from "react-router";
import  MealPlanList from "../../components/mealplan/mealplanList";

export function MealPlanSearching() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [mealplanData, setMealPlanData] = React.useState<MealPlan[]>([]);
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [recipeInformationToEdit, setRecipeInformationToEdit] = React.useState<Recipe | null>(null);

    const handleSearch = (query: string) => {
        console.log(query)
        setSearchQuery(query);
    }

    const handleAddNewRecipe = () => {
        setRecipeInformationToEdit(null);
        setIsFormVisible(true);
    };

    useEffect(() => {
        const fetchData = async() => {
            setMealPlanData([]);
            // console.log("hei?")
            console.log(searchQuery)
            const data = await getUserMealPlanByID(searchQuery);
            // console.log(data);
            setMealPlanData(data);
        };

        fetchData();
    }, [searchQuery]);


    return (
        <div>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none
                    lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> Hello, </h1>
                            <h2 className="text-base font-semibold leading-7 text-indigo-600"> Enjoy your meal! </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
                 <SearchBar onSearch={handleSearch}/>

                 {/* <div className="flex space-x-4">
                    <button 
                        onClick={handleAddNewRecipe}
                        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        + New
                    </button>
                 </div> */}

                 <div className="mt-6 py-10 sm:py-15">
                     <MealPlanList MealPlanData={mealplanData} />
                 </div>
            </div>

            {/* <div className="mt-6 py-10 sm:py-15">
                <UserList userData={userData} />
            </div> */}

        </div>
    );
}