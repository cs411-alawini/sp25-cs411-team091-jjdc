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
