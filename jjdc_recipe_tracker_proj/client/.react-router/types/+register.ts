import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/register": {};
  "/graph": {};
  "/login": {};
  "/logout": {};
  "/recipe": {};
  "/addIngredients": {};
  "/searchRecipe/:RecipeID": {
    "RecipeID": string;
  };
  "/addMealPlan": {};
  "/mealplan": {};
  "/nutritionStats": {};
};