import { Router, Request, Response } from "express";
import { getAllUser} from "../services/database";
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

    } else {
    }
});


export default router;
