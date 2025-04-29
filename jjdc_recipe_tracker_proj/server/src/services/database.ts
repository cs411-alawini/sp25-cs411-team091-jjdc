import pool from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user";
import { Log } from "../models/recipe";
import { MealPlan } from "../models/mealPlan";


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
    console.log("running this specific user one")
    const queryName = UserID;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.UserInfo WHERE UserID LIKE '%${queryName}%';`;
    const [rows] = await pool.query(sqlQuery);
    return rows as User[];
}

export async function checkUserExists(UserID: string): Promise<User[]> {
    console.log("running this specific user one")
    const queryName = UserID;//.toLowerCase();
    const sqlQuery = `SELECT * FROM BalanceBites.UserInfo WHERE UserID = '${queryName}';`;
    const [rows] = await pool.query(sqlQuery);
    return rows as User[];
}

export async function getUserByLogin(UserID: string, Password: string): Promise<User[]> {
    const queryID = UserID;//.toLowerCase();
    const queryPass = Password
    console.log(queryID)
    console.log(queryPass)
    const sqlQuery = `SELECT * FROM BalanceBites.UserInfo WHERE UserID = '${queryID}' AND Password = '${queryPass}';`;
    const [rows] = await pool.query(sqlQuery);
    console.log(rows)
    return rows as User[]
}

export async function addUser(NewUser: User): Promise<void> {
    console.log(NewUser)
    const sqlQuery = `INSERT INTO BalanceBites.UserInfo (UserID, Password, Name) VALUES ('${NewUser.UserID}', '${NewUser.Password}', '${NewUser.Name}');`;
    console.log("after registration")
    const result = await pool.query(sqlQuery);
    console.log(result)
}

export async function updateUserID(User: User): Promise<void> {
    const sqlQuery = `UPDATE BalanceBites.UserInfo SET Password = ${User.Password}, Name = '${User.Name}' WHERE UserID = '${User.UserID}';`;
    await pool.query(sqlQuery);
}

export async function getUserNutritionStats(userId: string): Promise<any> {
    const [rows] = await pool.query('CALL GetUserNutritionStats(?)', [userId]);
    // Stored procedures in MySQL2 return [[result1], [result2], ...]
    // const todayStats = rows[0];
    // const weeklyAvgStats = rows[1];${
}

export async function addNutritionLog(NewLog: Log): Promise<void> {
    console.log(NewLog)
    const now: Date = new Date();
    console.log(now.toISOString().slice(0, 19).replace('T', ' '));
    const date_to_put = now.toISOString().slice(0, 19).replace('T', ' ');
    const sqlQuery = `INSERT INTO BalanceBites.NutritionLog (UserID, Time, RecipeID) VALUES ('${NewLog.UserID}', ${NewLog.Time}, ${NewLog.RecipeID});`;
    console.log("after adding nutritionLog")
    const result = await pool.query(sqlQuery);
    console.log(result)
}

export async function getUserMacros(UserID: string): Promise<any> {
    const sqlQuery = `SELECT DAYNAME(Time) as dayOfWeek, SUM(Calories) AS sumCalories, SUM(Fat) AS sumFat, SUM(Carbohydrates) AS sumCarbohydrates, SUM(Protein) AS sumProtein
    FROM Foods NATURAL JOIN (SELECT FoodName, Time
        FROM Ingredients JOIN NutritionLog USING (RecipeID)
        WHERE UserID = '${UserID}') AS userDailyRecipes
        GROUP BY 
            dayOfWeek
        ORDER BY
            dayOfWeek`;
    const result = await pool.query(sqlQuery);
    return result[0];
}
export async function searchRecipes(searchTerm: string, UserID: string): Promise<any> {
    const sqlQuery = `SELECT RecipeID AS id, Name AS name FROM Recipes WHERE (Public = true OR UserID = '${UserID}') AND Name like '%${searchTerm}%'`;
    const [result] = await pool.query(sqlQuery);
    return result;
}

export async function addMealPlanRecipes(MealPlanID: number, recipes: number[]): Promise<void> {
    for (const recipeID of recipes) {
        const addMealPlanQuery = `INSERT INTO MealPlanRecipes(MealPlanID, RecipeID) VALUES ('${MealPlanID}', '${recipeID}')`;
        await pool.query(addMealPlanQuery);
    }
}




// export async function getUserNutritionStats(userId: string): Promise<any> {
//     const [rows] = await pool.query('CALL GetUserNutritionStats(?)', [userId]);
//     // Stored procedures in MySQL2 return [[result1], [result2], ...]
//     // const todayStats = rows[0];
//     // const weeklyAvgStats = rows[1];

//     return rows;
// }
export async function addMealPlan(UserID: string, Name: string, Public: boolean, RecipeID1: number, RecipeID2: number): Promise<void> {
    const callProcedure = `CALL CreateMealPlanTransaction('${UserID}', '${Name}', ${Public}, '${RecipeID1}', '${RecipeID2}');`;
    await pool.query(callProcedure);
}

export async function getUserMealPlansByID(userId: string): Promise<any> {
    const [rows] = await pool.query(`SELECT * FROM MealPlan WHERE UserID LIKE '${userId}';`);
    return rows;
}

export async function getMealPlansByID(mealplanId: number): Promise<any> {
    const [rows] = await pool.query(`SELECT * FROM MealPlan WHERE MealPlanID = ${mealplanId};`);
    return rows;
}

export async function getRecipeInMealPlansByID(mealplanId: number): Promise<any> {
    const [rows] = await pool.query(`SELECT Name FROM Recipes WHERE RecipeID IN (SELECT RecipeID FROM MealPlanRecipes WHERE MealPlanID = ${mealplanId});`);
    return rows;
}

// export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
//     const sqlQuery = `DELETE FROM pokemon_spawn WHERE spawnID = ${spawnID};`;
//     await pool.query(sqlQuery);
// }
