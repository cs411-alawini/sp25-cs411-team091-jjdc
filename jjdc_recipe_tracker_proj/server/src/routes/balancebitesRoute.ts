import { Router, Request, Response } from "express";
import { getAllUser, getUserByUserID, addUser, getUserByLogin, getUserMacros, searchRecipes, addMealPlan, addMealPlanRecipes, getUserNutritionStats, addNutritionLog, getUserMealPlansByID, getMealPlansByID, getRecipeInMealPlansByID} from "../services/database";
import { User } from "../models/user";


const router = Router();


// At first we used req.query.pokemonName
// which corresponds to the query of api/pokemon?pokemonName=pikachu

// api/pokemon?search=pikachu

router.get("/", async (req: Request, res: Response) => {
    // if there is no query parameter, return all users
    if (!req.query.search) {
        try {
            const allUser: User[] = await getAllUser();
            res.status(200).json(allUser);
        } catch (error) {
            res.status(500).json({ message: "Error fetching Users" });
        }
    }
    else {
        const query = req.query.search as string;
        console.log(query)
        try {
            const users: User[] = await getUserByUserID(query)
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching Users by ID" });
        }
    }
});

router.post("/register", async (req: Request, res: Response) => {
    const newUser: User = req.body;
    console.log("running register")
    try {
        const user = await addUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error Adding User" });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    // code for getting the user? If the user exists with a specified id and password, good, otherwise bad
    // need to write a new SQL query for this.
    const loginInfo = req.body
    try {
        const correctUser: User[] = await getUserByLogin(loginInfo.UserID, loginInfo.Password)
        console.log(correctUser)
        res.status(201).json(correctUser);
    } catch (error) {
        res.status(500).json({ message: "Error User Doesn't Exist" });
    }
});


router.get("/nutritionstats", async (req: Request, res: Response) => {
    if (!req.query.UserID) {
        const userId = 'aabrahmovicio6';

        try {
            console.log("In stats");
            const stats = await getUserNutritionStats(userId);
            console.log(stats);
            res.status(201).json(stats);
        } catch (error) {
            res.status(500).json({ message: "Error fetching macros" });
        }
    }
    else {
        const userId = 'aabrahmovicio6'; //= req.query.UserID as string; //'aabrahmovicio6';
        console.log(userId)
        try {
            console.log("In stats");
            const stats = await getUserNutritionStats(userId);
            console.log(stats);
            res.status(201).json(stats);
        } catch (error) {
            res.status(500).json({ message: "Error fetching macros" });
        }
    }

});

router.post("/nutritionlog", async (req: Request, res: Response) => {
    const nutritionlog = req.body;
    try {
        const Log = await addNutritionLog(nutritionlog);
        res.status(201).json(Log);
    } catch (error) {
        res.status(500).json({ message: "Error creating nutrition log" });
    }
});


router.get("/macros", async (req: Request, res: Response) => {
    if (!req.query.UserID) {
        const userId = 'aabrahmovicio6';
        try {
            const macros = await getUserMacros(userId);
            console.log(macros);
            res.status(201).json(macros);
        } catch (error) {
            res.status(500).json({ message: "Error fetching macros" });
        }
    }
    else {
        const userId = req.query.UserID as string; //'aabrahmovicio6';

        try {
            const macros = await getUserMacros(userId);
            console.log(macros);
            res.status(201).json(macros);
        } catch (error) {
            res.status(500).json({ message: "Error fetching macros" });
        }
    }

});

router.get("/search/recipes", async (req: Request, res: Response) => {
    const { searchTerm, userID } = req.query;
    try {
        const recipes = await searchRecipes(searchTerm as string, userID as string);
        res.status(201).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

router.post("/meal", async (req: Request, res: Response) => {
    const { userID, name, isPublic, recipes } = req.body;
    try {
        await addMealPlan(userID, name, isPublic, recipes[0], recipes[1]);
        res.status(201).json({ message: "Meal plan created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating meal plan" });
    }
});

router.post("/meal/recipes", async (req: Request, res: Response) => {
    const { mealPlanID, recipes } = req.body;
    try {
        await addMealPlanRecipes(mealPlanID, recipes);
        res.status(201).json();
    } catch (error) {
        res.status(500).json({ message: "Error adding to meal plan recipes" });
    }
});

router.get("/mealplan", async (req: Request, res: Response) => {
    // if there is no query parameter, return all users
    console.log('here')
    if (!req.query.search) {
        console.log('here')
        res.status(500).json({ message: "Error fetching mealplan by UserID" });
    }
    else {
        console.log('there')
        const query = req.query.search as string;
        console.log(query)
        try {
            const users: User[] = await getUserMealPlansByID(query)
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching mealplan" });
        }
    }
});

router.get("/mealplan/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const mealplan = await getMealPlansByID(id);
      if (mealplan) {
        res.status(200).json(mealplan);
      } else {
        res.status(404).json({ message: `No meal plan found with ID ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal plan" });
    }
});

router.get("/mealplan/recipe/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const recipe = await getRecipeInMealPlansByID(id);
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: `No meal plan found with ID ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal plan" });
    }
});

export default router;
