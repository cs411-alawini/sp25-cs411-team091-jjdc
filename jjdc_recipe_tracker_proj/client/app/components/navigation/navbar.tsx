import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/react"
import type { User } from "../../services/services";
import { useState } from "react";
import { Form, redirect } from "react-router";


export async function action({ request }: { request: Request }) {
  // const test = getCurrentUserID(request)
  // const session = await getSession(
  //   request.headers.get("Cookie")
  // );

  // return redirect("/", {
  //   headers: {
  //     "Set-Cookie": await destroySession(session),
  //   },
  // });
}

export function StickyNavbar({ user }: { user: Omit<User, "Password"> }) {

    return (
        <Navbar className="dark bg-black">
            <NavbarContent className="hidden md:flex gap-4" justify="center">
              <NavbarItem>
                <Link className="text-white" color="primary" href="/"> 
                  Home
                </Link>
              </NavbarItem> 
            </NavbarContent>

            {/* <NavbarContent as="div" justify="end">
                {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
            </NavbarContent> */}
            {user ? <UserLoggedIn user={user} /> : <UserNotLoggedIn />}
        </Navbar>
    )
}

function UserLoggedIn({ user }: { user: Omit<User, "Password"> }) {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <p className="font-semibold text-white">Signed in as {user.UserID} (Name: {user.Name})</p>
      </NavbarItem> 
      <NavbarItem>
        <Link className="text-white" color="primary" href="/recipe"> 
          Recipes
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link className="text-white" color="primary" href="/addIngredients"> 
          Add Ingredients
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link className="text-white" color="primary" href="/addMealPlan"> 
          Meal Plans
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link className="text-white" color="primary" href="/nutritionStats"> 
        {user.Name}'s Nutrition Stats
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link className="text-white" color="primary" href="/log"> 
          Nutrition Tracker
        </Link>
      </NavbarItem>

      <NavbarItem>
        {/* <Button className="text-white" color="danger" onPress={async () => {

        }}>
          Logout
        </Button> */}
        <Link className="text-white" href="/logout"> 
          Logout
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}

function UserNotLoggedIn() {
  return (
    <NavbarContent justify="end">
    <NavbarItem>
      <Link className="text-white" href="/login"> 
        Login
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link className="text-white" href="/register"> 
        Register
      </Link>
    </NavbarItem>
  </NavbarContent>
  )
}


