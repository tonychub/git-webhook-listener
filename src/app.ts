import moduleAlias from "module-alias";
import { config } from "dotenv";
config();
import { myAction } from "./api/myApi";
moduleAlias.addAliases({
  "@": __dirname,
});
import express, { Application, Request, Response } from "express";
import data from "./example.json";
import cors from "cors";
import { IAction } from "./type";

const port = process.env.PORT || 9999;
const app: Application = express();
const name = process.env.MYNAME || "Kun";
app.use(cors());
app.use(express.json());

const fetchActions = async (body: any) => {
  (data.actions as IAction[]).map(async (item) => {
    const { listen_type, from, to } = item;
    if (
      listen_type === body.action &&
      body.pull_request.head.ref === from &&
      body.pull_request.base.ref === to
    ) {
      const res = await myAction(item.action);
    }
  });
};

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Hello " + name,
  });
});
app.post("/", (req: Request, res: Response) => {
  fetchActions(req.body);
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
