import type { Route } from "./+types/home";
import { MealPlanSearching } from "~/pages/mealplan/mealplanpage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Recipe() {
  return <MealPlanSearching />;
}