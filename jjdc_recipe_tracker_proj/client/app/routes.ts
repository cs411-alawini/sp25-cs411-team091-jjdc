import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/register", "routes/register.tsx"),
    route("/login", "routes/login.tsx"),
    route("/recipe", "routes/recipe.tsx"),
    route("/searchRecipe/:RecipeID", "routes/searchRecipe.tsx"),
] satisfies RouteConfig;


