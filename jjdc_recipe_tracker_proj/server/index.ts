import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import balanceBiteRoutes from './src/routes/balancebitesRoute';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
      secret: "subscribe",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 24 * 30,
      },
    })
  );

app.get('/api', (req: Request, res: Response) => {
    res.send('API of BalanceBite');
});

app.use('/api/balancebites', balanceBiteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
    console.log(req.session);
    console.log(req.session.id);
});