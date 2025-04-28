import { Router, Request, Response } from "express";
import { getAllUser, getUserByUserID, addUser} from "../services/database";
import { User } from "../models/user";
import { Ingredients, Recipe } from "../models/recipe";
import { getAllRecipe, getRecipeByName, getRecipeByID, getFoodsInRecipeByID, getNutritionInRecipeByID, addRecipe, getMaxRecipeID, addIngredient, updateIngredient, deleteIngredient } from "../services/recipe";

const router = Router();

router.get("/maxrecipe", async (req: Request, res: Response) => {
    // const id = parseInt(req.params.id);
    try {
      const maxID = await getMaxRecipeID();
      if (maxID) {
        res.status(200).json(maxID);
      } else {
        res.status(404).json({ message: `No Max Recipe ID found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching Max Recipe ID" });
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

router.post("/addrecipe", async (req: Request, res: Response) => {
    const NewRecipe: Recipe = req.body;
    console.log("running add recipe")
    try {
        const recipe = await addRecipe(NewRecipe);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error Adding Recipe" });
    }
});

router.post("/addingredient", async (req: Request, res: Response) => {
    const NewIngredient: Ingredients = req.body;
    console.log("running add Ingredient")
    try {
        const ingredient = await addIngredient(NewIngredient);
        res.status(201).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: "Error Adding Recipe" });
    }
});

router.put("/updateingredient", async (req: Request, res: Response) => {
    const updatedIng: Ingredients = req.body;
    try {
      await updateIngredient(updatedIng);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error updating ingredients" });
    }
});

router.delete("/deleteingredient", async (req: Request, res: Response) => {
    const deletedIng: Ingredients = req.body;
    try {
      await deleteIngredient(deletedIng);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting ingredients" });
    }
});

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



export default router;

// curl -X POST http://localhost:3007/api/recipe/addingredient -H "Content-Type: application/json" -d '{
//     "RecipeID": 1058,
//     "FoodName": "onion",
//     "Quantity": 100
//     }'
