import express, {
  Application
} from 'express'

import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from './routes/authRouter';

const app: Application = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth",authRouter)


app.get("/", (req, res) => {
  return res.send("Afro Opportunity Hub!");
});


export default app;
