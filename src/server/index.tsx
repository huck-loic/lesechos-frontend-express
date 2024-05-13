/* eslint @typescript-eslint/no-var-requires: 0 */

import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import renderer from "./renderer";
import { wait } from "../shared/utils/wait";
import { randomBetween } from "../shared/utils/random";
import { NEWSLETTER_ITEMS } from "./mocks/newsletters";
import { USER_WITHOUT_SUBSCRIPTION, USER_WITH_MULTIPLE_SUBSCRIPTION, USER_WITH_ONE_SUBSCRIPTION } from "./mocks/user";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === "development") {
  const webpackConfig = require("../../webpack/dev/webpack.dev.client.cjs");
  const compiler: any = webpack(webpackConfig);

  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
    })
  );

  app.use(WebpackHotMiddleware(compiler));
}

app.use(compression());
app.use(express.static("public"));
app.use(express.static("dist"));

app.get("/api/newsletters", async (req: express.Request, res: express.Response) => {
  await wait(randomBetween(100, 500));
  res.json(NEWSLETTER_ITEMS);
});

app.get("/api/user/:user?", async (req: express.Request, res: express.Response) => {
  await wait(randomBetween(100, 500));

  const type = req.params.user;

  if (type === "one") {
    res.json(USER_WITH_ONE_SUBSCRIPTION);
  } else if (type === "multiple") {
    res.json(USER_WITH_MULTIPLE_SUBSCRIPTION);
  } else {
    res.json(USER_WITHOUT_SUBSCRIPTION);
  }
});

// TODO: separate route / controller
app.get("/:user?", async (req: express.Request, res: express.Response) => {
  try {
    const html = await renderer(req);

    res.status(200).contentType("text/html").send(html);
  } catch (err) {
    console.log("error in rendering server side:", err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
