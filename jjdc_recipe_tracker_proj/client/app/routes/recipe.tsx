import { UserSearching } from "../pages/recipe/recipePage"
import React, { useState, useEffect } from "react";
import SearchBar from "../components/recipe/searchBar";
import RecipeList from "../components/recipe/recipeList";
import RecipeForm from "../components/recipe/recipeForm";
import { searchUserData, type User , type Recipe , searchRecipeData, addrecipe, getMaxRecipeByID } from "../services/services";
import { useParams, Form, useLoaderData } from "react-router";
import {  
    Button,
    Modal,
    ModalContent,
    ModalHeader, 
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
} from "@heroui/react"
import { getCurrentUserID } from "~/services/sessions.server";
import { FormControlLabel, Checkbox } from "@mui/material";


export async function loader({ request }: { request: Request }) {
    const currUser = await getCurrentUserID(request);

    return currUser ? currUser : "aabrahmovicio6";
}

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  const recipeName = formData.get("recipename");
  const isPub = formData.get("public");

  const currUserID = await getCurrentUserID(request);
  const workingUserID = currUserID ? currUserID : "aabrahmovicio6";

  let publicBool = false
  if (isPub === "on") {
    publicBool = true
  }
  // console.log(publicBool)
  if (typeof recipeName !== "string" || typeof publicBool !== "boolean") {
    return { error: "Recipe name and public selection are required", status: 401 }
  }
  
  try {
      // console.log("awaiting recipe ID")
      const newRecipeID = await getMaxRecipeByID();
      // console.log(newRecipeID)
      const newRecipe = await addrecipe(newRecipeID, recipeName, workingUserID, publicBool);
      // console.log("worked recipe?")
      
      return { success: "Recipe successfully created" }
  } catch (error) {
      
  }
}

export function meta() {
  return [
    { title: "Balance Bites Project" },
    { name: "description", content: "CS411 Project" },
  ];
}

export default function Recipe() {
      const [searchQuery, setSearchQuery] = React.useState("");
      const [recipeData, setRecipeData] = React.useState<Recipe[]>([]);
      const [isFormVisible, setIsFormVisible] = React.useState(false);
      const [recipeInformationToEdit, setRecipeInformationToEdit] = React.useState<Recipe | null>(null);
      const {isOpen, onOpen, onOpenChange} = useDisclosure();
      const [isPublic, setIsPublic] = useState(true);
  
      const handleSearch = (query: string) => {
          console.log(query)
          setSearchQuery(query);
      }
  
      const handleAddNewRecipe = async () => {
          // setRecipeInformationToEdit(null);
          // setIsFormVisible(true);
          // console.log("yippee")
      };
  
      useEffect(() => {
          const fetchData = async() => {
              setRecipeData([]);
              // console.log("hei?")
              console.log(searchQuery)
              const data = await searchRecipeData(searchQuery);
              // console.log(data);
              setRecipeData(data);
          };
  
          fetchData();
      }, [searchQuery]);

  return (
    <div>
    <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none
            lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> Hello, </h1>
                    <h2 className="text-base font-semibold leading-7 text-indigo-600"> Enjoy your meal! </h2>
                </div>
            </div>
        </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
         <SearchBar onSearch={handleSearch}/>

         <div className="flex space-x-4">
            {/* <button 
                onClick={handleAddNewRecipe}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                + New
            </button> */}
            <Button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" onPress={onOpen}>Add Recipe</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                          <h2 className="text-lg font-bold mb-4">
                          </h2>
                          <Form method="post">
                            <label
                            htmlFor="Recipe"
                            className="block text-sm font-medium text-gray-900"
                            >
                              Recipe
                            </label>
                            <Input
                              name="recipename"
                              type="text"
                              placeholder="Enter the recipe name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label>
                              Make Public?
                            </label> 
                            <input type="checkbox" id="public" name="public" /> 
                            {/* <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isPublic} 
                                  onChange={(e) => setIsPublic(e.target.checked)} 
                                />
                              }
                              label="Make this meal plan public"
                            /> */}
                            <Button 
                            type="submit"
                            color="primary"
                            onPress={onClose}
                            >
                              Submit
                            </Button>
                          </Form>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
         </div>

         <div className="mt-6 py-10 sm:py-15">
             <RecipeList recipeData={recipeData} />
         </div>
      </div>
    </div>
  );
}
