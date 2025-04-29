import { UserSearching } from "../pages/recipe/recipePage"


// export async function loader({ request }: { request: Request }) {

// }

// export async function action({ request }: { request: Request }) {

// }

export function meta() {
  return [
    { title: "Balance Bites Project" },
    { name: "description", content: "CS411 Project" },
  ];
}

export default function Recipe() {
  return (
    <UserSearching />
  );
}
