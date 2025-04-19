import React, { useState, useEffect } from "react";
import type { User } from "../../services/services";
import { Link } from "react-router";

interface UserListProps {
  userData: User[];
}

// const getPokemonImage = async (pokemonName: string): Promise<string | null> => {
//   try {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.sprites.front_default;
//   } catch (error) {
//     console.error("Failed to fetch Pokemon image:", error);
//     return null;
//   }
// };

const UserList: React.FC<UserListProps> = ({ userData }) => {
//   const [pokemonImages, setPokemonImages] = useState<{
//     [key: number]: string | null;
//   }>({});

//   useEffect(() => {
//     const fetchImages = async () => {
//       const images: { [key: number]: string | null } = {};
//       for (const pokemon of userData) {
//         const imageUrl = await getPokemonImage(pokemon.pokemonName);
//         images[pokemon.pokemonID] = imageUrl;
//       }
//       setPokemonImages(images); // Set the images once all have been fetched
//     };

//     fetchImages();
//   }, [pokemonData]); // Runs whenever pokemonData changes

  return (
    <ul className="divide-y divide-gray-200">
      {userData.map((user) => (
        <li key={user.UserID} className="flex py-4">
          <div className="ml-3 py-5">
            <p className="text-xl font-medium text-gray-900">
              {user.Name}
            </p>
            <p className="text-xl font-medium text-gray-900">
              {user.Password}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;