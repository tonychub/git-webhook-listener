import moduleAlias from "module-alias";
import { config } from "dotenv";
config();
import { getWebhookActionById, runScriptById } from "./api/myApi";
moduleAlias.addAliases({
  "@": __dirname,
});
import express, { Application, Request, Response } from "express";

import cors from "cors";
import { IWebhookAction } from "./type";
import { RUN_ACTION_ERRORS, RUN_ACTION_SUCCESS } from "./constants";

const port = process.env.PORT || 9999;
const app: Application = express();
const name = process.env.MYNAME || "Kun";
app.use(cors());
app.use(express.json());

const responseActions = async (
  body: any,
  webhookAction: IWebhookAction
): Promise<boolean> => {
  const { listenType, from, to, scriptId } = webhookAction;
  if (
    body.pull_request.head.ref === from &&
    body.pull_request.base.ref === to
  ) {
    if (body.action === "opened") {
      if (listenType === body.action) {
        await runScriptById(scriptId);
        return true;
      }
    } else if (body.action === "closed") {
      if (!body.pull_request.merged && listenType === "closed") {
        await runScriptById(scriptId);
        return true;
      }
      if (body.pull_request.merged && listenType === "merged") {
        await runScriptById(scriptId);
        return true;
      }
    }
  }
  return false;
};

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Hello " + name,
  });
});
app.post("/webhook/:webhookActionId", async (req: Request, res: Response) => {
  try {
    const webhookAction = await getWebhookActionById(
      req.params.webhookActionId
    );
    const data = await responseActions(req.body, webhookAction);
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
