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
// app.options("*", cors(corsOption));
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());



app.get('/', (req: Request, res: Response) => {
  res.redirect(process.env.FRONTEND_URL as string);
});
app.get("/api/debug", (req, res) => {
  res.json({ routes: "working" });
});


app.use('/api/properties', propertyRoutes)

app.use('/*splat', (req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
})


export default app;