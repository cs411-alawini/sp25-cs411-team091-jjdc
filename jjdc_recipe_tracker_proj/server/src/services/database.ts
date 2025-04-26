import pool from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user";

// Before we add sql commands

export async function getAllUser(): Promise<User[]> {
    console.log('Statement 1');
    const queryString = 'SELECT * FROM BalanceBites.UserInfo LIMIT 10';
    console.log('Statement 2');
    // const [rows] = await pool.query(queryString);
    const [rows] = await pool.query('SELECT * FROM BalanceBites.UserInfo LIMIT 10');
    console.log('Statement 3');
    return rows as User[];
}

export async function getUserByUserID(UserID: string): Promise<User[]> {
    const queryName = UserID;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.UserInfo WHERE UserID LIKE '%${queryName}%';`;
    const [rows] = await pool.query(sqlQuery);
    return rows as User[];
}

export async function addUser(NewUser: User): Promise<void> {
    const sqlQuery = `INSERT INTO UserInfo (UserID, Password, Name) VALUES (${NewUser.UserID}, '${NewUser.Password}', ${NewUser.Name});`;
    await pool.query(sqlQuery);
}

export async function updateUserID(User: User): Promise<void> {
    const sqlQuery = `UPDATE UserInfo SET Password = ${User.Password}, Name = '${User.Name}' WHERE UserID = ${User.UserID};`;
    await pool.query(sqlQuery);
}
export async function getUserMacros(UserID: string): Promise<any> {
    const sqlQuery = `SELECT SUM(Calories) AS sumCalories, SUM(Fat) AS sumFat, SUM(Carbohydrates) AS sumCarbohydrates, SUM(Protein) AS sumProtein
    FROM Foods NATURAL JOIN (SELECT FoodName 
        FROM Ingredients
        WHERE RecipeID IN (SELECT RecipeID
            FROM NutritionLog
            WHERE UserID = '${UserID}')) AS userDailyRecipes`;
    const result = await pool.query(sqlQuery);
    return result[0];
}
  
// export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
//     const sqlQuery = `DELETE FROM pokemon_spawn WHERE spawnID = ${spawnID};`;
//     await pool.query(sqlQuery);
// }
