import type { Route } from "./+types/home";
import { UserSearching } from "../pages/recipe/recipePage"
import { SearchRecipePage } from "../pages/recipe/searchRecipe"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RecipeSearch() {
  return <SearchRecipePage/>;
}
