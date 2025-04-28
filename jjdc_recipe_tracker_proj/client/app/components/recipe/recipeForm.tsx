import React from 'react';
import { type Recipe } from '~/services/services';
import { Form } from "react-router";
import {
    Button,
    Input,
    Checkbox,
} from "@heroui/react"



const RecipeForm: React.FC = () => {
    const [name, setName] = React.useState<string>('No Name');
    const [userID, setUserID] = React.useState<string>('No ID');
    const [publicR, setPublic] = React.useState<boolean>(true);

    return (

        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-bold mb-4">
                </h2>
                <div>
                    <label
                        htmlFor="Recipe"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Recipe
                    </label>
                    <Input
                        name="recipename"
                        type="text"
                        // value={address}
                        // onChange={handleAddressChange}
                        // onBlur={handleAddressBlur}
                        placeholder="Enter the recipe name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <Input
                        name="userid"
                        type="text"
                        // value={address}
                        // onChange={handleAddressChange}
                        // onBlur={handleAddressBlur}
                        placeholder="Enter Your User ID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <input type="checkbox"/> public?
                </div>
            </div>
        </div>
    );
};
export default RecipeForm;