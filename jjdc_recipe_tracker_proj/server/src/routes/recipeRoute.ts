import { Router, Request, Response } from "express";
import { getAllUser, getUserByUserID, addUser} from "../services/database";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";
import { getAllRecipe, getRecipeByName, getRecipeByID, getFoodsInRecipeByID, getNutritionInRecipeByID } from "../services/recipe";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    // if there is no query parameter, return all users
    if (!req.query.search) {
        console.log('Return all recipes');
        try {
            const allRecipe: Recipe[] = await getAllRecipe();
            res.status(200).json(allRecipe);
        } catch (error) {
            res.status(500).json({ message: "Error fetching all Recipe" });
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

// api/recipe/1
router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const recipe = await getRecipeByID(id);
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: `No Recipe found with ID ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching Recipe" });
    }
});

router.get("/ingredients/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const ingredients = await getFoodsInRecipeByID(id);
      if (ingredients) {
        res.status(200).json(ingredients);
      } else {
        res.status(404).json({ message: `No Ingredients found with Recipe ID ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching Ingredients" });
    }
});

router.get("/nutritions/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const nutritions = await getNutritionInRecipeByID(id);
      if (nutritions) {
        res.status(200).json(nutritions);
      } else {
        res.status(404).json({ message: `No nutritions found with Recipe ID ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching nutritions" });
    }
});

export default router;
