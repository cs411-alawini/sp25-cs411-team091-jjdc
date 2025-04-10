import { Pokemon } from "../models/pokemon";
import { PokemonSpawn } from "../models/pokemonSpawn";

import { pokemonData, pokemonSpawnData } from "../../../data/mockData";
import pool from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user";


const pd: Pokemon[] = pokemonData
const psd: PokemonSpawn[] = pokemonSpawnData

// Before we add sql commands
export async function getAllPokemon(): Promise<Pokemon[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(pd);
        }, 300);
    });
}

export async function getAllUser(): Promise<User[]> {
    console.log('Statement 1');
    const queryString = 'SELECT * FROM BalanceBites.UserInfo LIMIT 10';
    console.log('Statement 2');
    // const [rows] = await pool.query(queryString);
    const [rows] = await pool.query('SELECT * FROM BalanceBites.UserInfo LIMIT 10');
    console.log('Statement 3');
    return rows as User[];
}


// export async function getAllPokemon(): Promise<Pokemon[]> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(pokemonData);
//         }, 300);
//     });
// }

export async function getPokemonByPokemonName(pokemonName: string): Promise<Pokemon[]> {
    const queryName = pokemonName.toLowerCase();
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(pd.filter(p => p.pokemonName.toLowerCase().includes(queryName)));
        }, 300);
    });
}
    

export async function getPokemonByID(pokemonID: number): Promise<Pokemon | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(pd.find(p => p.pokemonID === pokemonID));
        }, 300);
    });
}


export async function getAllPokemonSpawns(): Promise<PokemonSpawn[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(psd);
        }, 300);
    });
}


export async function getPokemonSpawnBySpawnID(spawnID: number): Promise<PokemonSpawn | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(psd.find(p => p.spawnID === spawnID));
        }, 300);
    });
}



export async function getPokemonSpawnByPokemonID(pokemonID: number): Promise<PokemonSpawn[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(psd.filter(p => p.num === pokemonID));
        }, 300);
    });
}



export async function addPokemonSpawn(spawn: Omit<PokemonSpawn, 'spawnID'>): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const maxSpawnID = psd.length > 0 ? Math.max(...psd.map(p => p.spawnID)) : 0;
            const newSpawn: PokemonSpawn = {
            spawnID: maxSpawnID + 1,
            ...spawn,
            };
            psd.push(newSpawn);
            resolve();
        }, 300);
    });
}



export async function updatePokemonSpawn(spawn: PokemonSpawn): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = psd.findIndex(p => p.spawnID === spawn.spawnID);
            if (index >= 0) {
                psd[index] = spawn;
            }
            resolve();
        }, 300);
    });
}



export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
            const index = psd.findIndex(p => p.spawnID === spawnID);
            if (index >= 0) {
                psd.splice(index, 1);
            }
            resolve();
            }, 300);
        });
}