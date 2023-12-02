import express, { Request, Response, Application } from "express";

import cors from "cors";

import routes from "./routes/index";
import morgan from "morgan";

const app: Application = express()

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(routes);

export default app;
