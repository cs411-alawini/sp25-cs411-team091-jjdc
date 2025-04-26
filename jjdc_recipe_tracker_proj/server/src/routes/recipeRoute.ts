import { Router, Request, Response } from "express";
import { getAllUser, getUserByUserID, addUser} from "../services/database";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";
import { getAllRecipe, getRecipeByName } from "../services/recipe";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    // if there is no query parameter, return all users
    if (!req.query.search) {
        console.log('Return all recipes');
        try {
            const allRecipe: Recipe[] = await getAllRecipe();
            res.status(200).json(allRecipe);
        } catch (error) {
            res.status(500).json({ message: "Error fetching Users" });
        }
    }
    else {
        const query = req.query.search as string;
        console.log(query)
        try {
            const recipe: Recipe[] = await getRecipeByName(query)
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Error fetching Recipe by name" });
        }
    }
});

export default router;
