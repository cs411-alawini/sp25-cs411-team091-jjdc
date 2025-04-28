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
    // const weeklyAvgStats = rows[1];

    return rows;
}

export async function addMealPlan(UserID: string, Name: string, Public: boolean): Promise<any> {
    const callProcedure = `CALL CreateMealPlanTransaction('${UserID}', '${Name}', ${Public});`;
    const result = await pool.query(callProcedure);
    return result[0]; 
}




  
// export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
//     const sqlQuery = `DELETE FROM pokemon_spawn WHERE spawnID = ${spawnID};`;
//     await pool.query(sqlQuery);
// }
