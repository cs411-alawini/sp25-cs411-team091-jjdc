import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/register", "routes/register.tsx"),
    route("/graph", "routes/graph.tsx"),
    route("/login", "routes/login.tsx"),
    route("/logout", "routes/logout.tsx"),
    route("/recipe", "routes/recipe.tsx"),
    route("/addIngredients", "routes/addIngredients.tsx"),
    route("/searchRecipe/:RecipeID", "routes/searchRecipe.tsx"), 
    route("/addMealPlan", "routes/addMealPlan.tsx"),
    route("/mealplan", "routes/usermealplan.tsx"),
    route("/searchmealplan/:MealPlanID", "routes/searchMealplan.tsx"),
    route("/nutritionStats", "routes/nutritionStats.tsx")
] satisfies RouteConfig;


