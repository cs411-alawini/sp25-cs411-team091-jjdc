import React, { useState, useEffect } from "react";
import SearchBar from "../../components/recipe/searchBar";
import RecipeList from "../../components/recipe/recipeList";
import RecipeForm from "~/components/recipe/recipeForm";
import { searchUserData, type User , type Recipe , searchRecipeData, addrecipe } from "../../services/services";
import { useParams, Form } from "react-router";
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


export function UserSearching() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [recipeData, setRecipeData] = React.useState<Recipe[]>([]);
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [recipeInformationToEdit, setRecipeInformationToEdit] = React.useState<Recipe | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleSearch = (query: string) => {
        console.log(query)
        setSearchQuery(query);
    }

    const handleAddNewRecipe = async () => {
        // setRecipeInformationToEdit(null);
        // setIsFormVisible(true);
        console.log("yippee")
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
                                <RecipeForm />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button 
                                type="submit"
                                color="primary" 
                                onPress={() => {
                                    onClose();
                                    handleAddNewRecipe();
                                }}>
                                Submit
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
