import moduleAlias from "module-alias";
import { myAction, myFetch } from "./api/myApi";
moduleAlias.addAliases({
  "@": __dirname,
});
import express, { Application, Request, Response } from "express";
import cors from "cors";

import { config } from "dotenv";
config();
type IData = {
  listen_type: string;
  from: string;
  to: string;
  actionGet: {
    method: string;
    url: string;
  };
  actionPost: {
    method: string;
    url: string;
  };
};

const port = process.env.PORT || 9999;

const app: Application = express();
const name = process.env.MYNAME || "Kun";
app.use(cors());
app.use(express.json());

const fetchActions = async (body: any) => {
  const actionData = await myFetch("/actions", "GET");

  (actionData as IData[]).map(async (item) => {
    if (item.listen_type === body.action) {
      const res = await myAction(item.actionGet.method, item.actionGet.url);
      myAction(item.actionPost.method, item.actionPost.url, res.data);
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
