import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/react"
import type { User } from "../../services/services";
import "tailwindcss/tailwind.css";
import { useState } from "react";

export function StickyNavbar({ user }: { user: User }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = {
      Home: "/",
      Recipes: "/recipes",
      "Meal Plans": "/plans",
      "Nutrion Log": "/logs",
      creation: "/roots",
    };
    return (
        <Navbar className="dark bg-black" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify="start">
                <NavbarBrand>
                    <img
                    src="/assets/images/leaves.png"
                    alt="Brand Logo"
                    className="h-8 w-8 mr-2"
                    />
                    <div className="hidden xm:block font-bold">
                    <span style={{ color: "#e21833" }}>Roots</span>{" "}
                    <span className="text-gray-400">and</span>{" "}
                    <span style={{ color: "#ffd200" }}>Routes</span>
                    </div>
                    <div className="block xm:hidden font-bold">
                    <span style={{ color: "#e21833" }}>R</span>
                    <span className="text-gray-400">a</span>
                    <span style={{ color: "#ffd200" }}>R</span>
                    </div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
            </NavbarContent>
        </Navbar>
    )
}

function LoggedIn({ user }: { user: User }) {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <img
            src="/assets/images/avatar.png"
            alt="Profile Picture"
            className="h-8 w-8 rounded-full border-blue-400 border-1.5"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-12 gap-2" href="/profile">
            <p className="font-semibold">Signed in as {user.UserID}</p>
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              try {
                const response = await fetch("/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                });
  
                if (!response.ok) {
                  throw new Error("Failed to log out");
                }
  
                if (response.redirected) {
                  window.location.href = response.url;
                }
              } catch (error: any) {
                console.error("Logout error:", error.message);
              }
            }}
            key="logout"
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
}

function NotLoggedIn() {
    return (
      <Dropdown placement="left">
        <DropdownTrigger>
          <img
            src="/assets/images/avatar.png"
            alt="Profile Picture"
            className="h-8 w-8 rounded-full border-blue-400 border-1.5"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="login" href="/login">
            Login
          </DropdownItem>
          <DropdownItem key="register" href="/register">
            Register
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
}

