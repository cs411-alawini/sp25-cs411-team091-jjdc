import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";
import { UserSearching } from "../pages/usersearch/searchPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <UserSearching />;
}
