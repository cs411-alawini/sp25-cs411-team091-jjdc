import React from 'react';
import { type Recipe } from '~/services/services';

interface recipeFormProps {
    onClose: () => void;
    // onSubmit: (recipeData: Omit<Recipe, 'RecipeID'>) => void;
}

const RecipeForm: React.FC<recipeFormProps> = ({ onClose }) => {
    const [name, setName] = React.useState<string>('No Name');
    const [userID, setUserID] = React.useState<string>('No ID');
    const [publicR, setPublic] = React.useState<boolean>(true);

    return (
        // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        //     <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        //         <h2 className="text-lg font-bold mb-4">Popup Modal</h2>
        //         {/* Placeholder content */}
        //         <p className="text-sm text-gray-600">This is a basic popup modal. No content yet!</p>
        //         {/* Close Button */}
        //         <div className="mt-4 flex justify-end">
        //             <button
        //             onClick={onClose}
        //             className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        //             >
        //             Close
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-bold mb-4">
                    {/* {defaultSpawnData ? 'Edit Pokémon Spawn' : 'Add Pokémon Spawn'} */}
                </h2>

                <form>
                    <div>
                        <label
                            htmlFor="Recipe"
                            className="block text-sm font-medium text-gray-900"
                    >
                            Recipe
                        </label>
                        <input
                            id="Recipe"
                            type="text"
                            // value={address}
                            // onChange={handleAddressChange}
                            // onBlur={handleAddressBlur}
                            placeholder="Enter the recipe name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <div>
                        <p className="text-sm text-gray-600">
                            {/* Latitude: {lat}, Longitude: {lng} */}
                        </p>
                        </div>
                        


                        <div className="mt-6 flex justify-end gap-x-2">
                            <button type="button" className="text-gray-900 font-semibold" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default RecipeForm;