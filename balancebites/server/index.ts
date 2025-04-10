import express, { Request, Response } from 'express';
import pokemonRoutes from './src/routes/pokemonRoute';
import pokemonSpawnRoutes from './src/routes/pokemonSpawns';
import balanceBiteRoutes from './src/routes/balancebitesRoute';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.send('API of BalanceBite');
});

app.use('/api/pokemon', pokemonRoutes);
app.use('/api/pokemonSpawns', pokemonSpawnRoutes);
app.use('/api/balancebites', balanceBiteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});