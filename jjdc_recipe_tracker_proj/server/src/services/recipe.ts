import pool from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user";
import { Ingredients, Recipe, Nutritions } from "../models/recipe";

// Before we add sql commands

export async function getAllRecipe(): Promise<Recipe[]> {
    // console.log('Statement 1');
    const queryString = 'SELECT * FROM BalanceBites.Recipes LIMIT 10';
    // console.log('Statement 2');
    // const [rows] = await pool.query(queryString);
    const [rows] = await pool.query(queryString);
    // console.log('Statement 3');
    return rows as Recipe[];
};

export async function getRecipeByName(RecipeName: string): Promise<Recipe[]> {
    console.log("running this specific recipe one")
    const queryName = RecipeName;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.Recipes WHERE Name LIKE '%${queryName}%';`;
    const [rows] = await pool.query(sqlQuery);
    // console.log(rows)
    return rows as Recipe[];
};

export async function getRecipeByID(RecipeID: number): Promise<Recipe[]> {
    console.log("running this specific recipe one")
    const queryName = RecipeID;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.Recipes WHERE RecipeID = ${queryName};`;
    const [rows] = await pool.query(sqlQuery);
    // console.log(rows)
    return rows as Recipe[];
};

export async function getFoodsInRecipeByID(RecipeID: number): Promise<Ingredients[]> {
    console.log("Getting Foods by RecipeID")
    const queryName = RecipeID;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.Ingredients WHERE RecipeID = ${queryName};`;
    const [rows] = await pool.query(sqlQuery);
    // console.log(rows)
    return rows as Ingredients[];
};

export async function getNutritionInRecipeByID(RecipeID: number): Promise<Nutritions[]> {
    console.log("Getting Foods by RecipeID")
    const queryName = RecipeID;//.toLowerCase();
    const sqlQuery = `SELECT SUM(Calories) AS sumCalories, SUM(Fat) AS sumFat, SUM(Carbohydrates) AS sumCarbohydrates, SUM(Protein) AS sumProtein FROM Foods NATURAL JOIN (SELECT FoodName FROM Ingredients WHERE RecipeID = ${queryName}) AS ingredientNames;`;
    const [rows] = await pool.query(sqlQuery);
    // console.log(rows)
    return rows as Nutritions[];
};

export async function getMaxRecipeID(): Promise<number> {
    console.log("Getting the max recipeID")
    // const queryName = RecipeID;//.toLowerCase();
    const sqlQuery = `SELECT MAX(RecipeID) AS maxID FROM BalanceBites.Recipes;`;
    const maxID = await pool.query(sqlQuery);
    // console.log(rows)
    return maxID as unknown as number;
};

export async function addRecipe(NewRecipe: Recipe): Promise<void> {
    // console.log(NewRecipe)
    const sqlQuery = `INSERT INTO BalanceBites.Recipes (RecipeID, Name, UserID, Public) VALUES ('${NewRecipe.RecipeID}', '${NewRecipe.Name}', '${NewRecipe.UserID}', '${NewRecipe.Public}');`;
    console.log("after new recipe")
    const result = await pool.query(sqlQuery);
    console.log(result)
}

export async function addIngredient(NewIngredient: Ingredients): Promise<void> {
    // console.log(NewRecipe)
    const sqlQuery = `INSERT INTO BalanceBites.Ingredients (RecipeID, FoodName, Quantity) VALUES ('${NewIngredient.RecipeID}', '${NewIngredient.FoodName}', '${NewIngredient.Quantity}');`;
    console.log("after new ingredient")
    const result = await pool.query(sqlQuery);
    console.log(result)
}

export async function updateIngredient(ingredient: Ingredients): Promise<void> {
    const sqlQuery = `UPDATE Ingredients SET Quantity = ${ingredient.Quantity} WHERE RecipeID = ${ingredient.RecipeID} AND FoodName = '${ingredient.FoodName}';`;
    await pool.query(sqlQuery);
}

export async function deleteIngredient(ingredient: Ingredients): Promise<void> {
    const sqlQuery = `DELETE FROM Ingredients WHERE RecipeID = ${ingredient.RecipeID} AND FoodName = '${ingredient.FoodName}';`;
    await pool.query(sqlQuery);
}
