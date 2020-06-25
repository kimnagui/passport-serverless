import * as serverless from "serverless-http";
import * as express from "express";
import passport from "./lib/passport";

const app = express();

passport(app);

module.exports.server = serverless(app);
