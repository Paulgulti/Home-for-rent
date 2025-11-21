import express, { Request, Response } from 'express'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors'
import propertyRoutes from '../src/routes/propertyRoutes'


const app = express()
const corsOption = {
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsOption))
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.json({ "fruits": ["Apple", "Banana", "Strawberry"] })
})

app.use('/api/properties', propertyRoutes)

app.listen(8080, () => {
    console.log('Server is running on Port 8080.');
})


export default app;