import moduleAlias from "module-alias";
import { config } from "dotenv";
config();
import { myResponse } from "./api/myApi";
moduleAlias.addAliases({
  "@": __dirname,
});
import express, { Application, Request, Response } from "express";
import data from "./example.json";
import cors from "cors";
import { IAction } from "./type";
import { RUN_ACTION_ERRORS, RUN_ACTION_SUCCESS } from "./constants";

const port = process.env.PORT || 9999;
const app: Application = express();
const name = process.env.MYNAME || "Kun";
app.use(cors());
app.use(express.json());

const responseActions = async (body: any): Promise<boolean> => {
  (data.actions as IAction[]).map(async (item) => {
    const { listen_type, from, to } = item;
    if (
      body.pull_request.head.ref === from &&
      body.pull_request.base.ref === to
    ) {
      if (body.action === "opened") {
        if (listen_type === body.action) {
          await myResponse(item.action);
          return true;
        }
      } else if (body.action === "closed") {
        if (!body.pull_request.merged && listen_type === "closed") {
          await myResponse(item.action);
          return true;
        }
        if (body.pull_request.merged && listen_type === "merged") {
          await myResponse(item.action);
          return true;
        }
      }
    }
  });
  return false;
};

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Hello " + name,
  });
});
app.post("/", async (req: Request, res: Response) => {
  try {
    const data = await responseActions(req.body);
    if (data) {
      return res.json({
        message: RUN_ACTION_SUCCESS.msg,
      });
    } else {
      res.status(RUN_ACTION_ERRORS.code).json({
        message: RUN_ACTION_ERRORS.msg,
      });
    }
  } catch (error) {
    res.status(RUN_ACTION_ERRORS.code).json({
      message: RUN_ACTION_ERRORS.msg,
    });
  }
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
