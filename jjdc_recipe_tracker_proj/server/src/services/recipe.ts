import pool from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";

// Before we add sql commands

export async function getAllRecipe(): Promise<Recipe[]> {
    // console.log('Statement 1');
    const queryString = 'SELECT * FROM BalanceBites.Recipes LIMIT 10';
    // console.log('Statement 2');
    // const [rows] = await pool.query(queryString);
    const [rows] = await pool.query(queryString);
    // console.log('Statement 3');
    return rows as Recipe[];
}

export async function getRecipeByName(RecipeName: string): Promise<Recipe[]> {
    console.log("running this specific recipe one")
    const queryName = RecipeName;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.Recipes WHERE Name LIKE '%${queryName}%';`;
    const [rows] = await pool.query(sqlQuery);
    // console.log(rows)
    return rows as Recipe[];
}
