import express, { Request, Response } from 'express';
import balanceBiteRoutes from './src/routes/balancebitesRoute';
import recipeRoutes from './src/routes/recipeRoute';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.send('API of BalanceBite');
});

app.use('/api/balancebites', balanceBiteRoutes);
app.use('/api/recipe', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});