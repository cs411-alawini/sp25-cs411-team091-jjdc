import type { Route } from "./+types/home";
import { UserSearching } from "../pages/recipe/recipePage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <UserSearching />;
}
