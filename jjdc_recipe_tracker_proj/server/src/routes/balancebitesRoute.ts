import { Router, Request, Response } from "express";
import { getAllUser, getUserByUserID, getUserMacros, addUser} from "../services/database";
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
    if (!req.query.search) {

    }
    else {
        try {
            const user = await addUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error adding User" });
        }
    }
});
router.get("/macros", async (req: Request, res: Response) => {
    const userId = 'aabrahmovicio6';
    try {
        const macros = await getUserMacros(userId);
        console.log(macros);
        res.status(201).json(macros);
    } catch (error) {
        res.status(500).json({ message: "Error fetching macros" });
    }
});



export default router;
