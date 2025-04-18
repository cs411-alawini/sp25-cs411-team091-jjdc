import React, { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import PokemonList from "../components/pokemonList";
import UserList from "../components/userList";
import { Pokemon, PokemonSpawn, searchPokemonData, searchPokemonSpawnData, searchUserData, User } from "../services/service";
import { useParams } from "react-router-dom";

const PokedexPage: React.FC = () => {

    const { pokemonID } = useParams();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [pokemonData, setPokemonData] = React.useState<Pokemon[]>([]);
    const [userData, setUserData] = React.useState<User[]>([]);
    const [pokemonSpawnData, setPokemonSpawnData] = useState<PokemonSpawn[]>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    // useEffect(() => {
    //     const fetchData = async() => {
    //         setPokemonData([]);
    //         const data = await searchPokemonData(searchQuery);
    //         // console.log(data);
    //         setPokemonData(data);
    //     };

    //     fetchData();
    // }, [searchQuery]);

    useEffect(() => {
        const fetchData = async() => {
            setUserData([]);
            const data = await searchUserData(searchQuery);
            // console.log(data);
            setUserData(data);
        };

        fetchData();
    }, [searchQuery]);

    

//     // useEffect(() => {
//     //     const fetchPokemon = async () => {
//     //         const data = await getPokemonByID(Number(pokemonID));
//     //         setPokemonSpawnData(data);
//     //     };

//     //     fetchPokemon();
//     // }, [pokemonID]);

//     // useEffect(() => {
//     //     const fetchSpawnData = async () => {
//     //         const data = await searchPokemonSpawnData(Number(pokemonID));
//     //         setPokemonSpawnData(data);
//     //     };

//     //     fetchSpawnData();
//     // }, [pokemonID]);


//     return (
//         <>
//             <div className="overflow-hidden bg-white py-12 sm:py-16">
//                 <div className="mx-auto max-w-7xl px-5 lg:px-7">
//                     <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
//                         <div className="lg:pr-8 lg:pt-4">
//                             <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                             My Pokédex
//                             </h1>
//                             <h2 className="text-base font-semibold leading-7 text-indigo-600">
//                             Gotta Catch 'Em All
//                             </h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
//                 <SearchBar onSearch={handleSearch}/>
//                 <div className="mt-6 py-10 sm:py-15">
//                     <PokemonList pokemonData={pokemonData} />
//                 </div>
//             </div>
//         </>
//     )
// }

    return (
        <>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none
                    lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> BalanceBites </h1>
                            <h2 className="text-base font-semibold leading-7 text-indigo-600"> Eat Healthy </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
                 <SearchBar onSearch={handleSearch}/>
                 <div className="mt-6 py-10 sm:py-15">
                     <UserList userData={userData} />
                 </div>
            </div>

            {/* <div className="mt-6 py-10 sm:py-15">
                <UserList userData={userData} />
            </div> */}
        </>
    );
}

export default PokedexPage;