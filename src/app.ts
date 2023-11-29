import moduleAlias from "module-alias";
moduleAlias.addAliases({
  "@": __dirname,
});
import express, { Application, Request, Response } from "express";
import cors from "cors";

import { config } from "dotenv";
config();
import mongoose from "mongoose";
const data = process.env.DATABASE;
mongoose.connect(data!).catch((error) => console.log(error));

const port = process.env.PORT || 9999;

const app: Application = express();
const name = process.env.MYNAME || "Kun";
app.use(cors());
app.use(express.json());
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Hello " + name,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
