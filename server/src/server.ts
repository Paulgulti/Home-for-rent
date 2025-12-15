import express, { Request, Response } from 'express'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors'
import propertyRoutes from './routes/propertyRoutes'

const PORT = process.env.PORT || 5000;
const app = express()
const corsOption = {
    origin: [
        "http://localhost:5173",
        "https://bet-ale.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsOption))
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running',  });
});

app.use('/api/properties', propertyRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
})


export default app;