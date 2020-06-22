// import { Handler, Context } from "aws-lambda";

// interface HelloResponse {
//   statusCode: number;
//   body: string;
// }

// const hello: Handler = async (event: any, context: Context) => {
//   const response: HelloResponse = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Hello World!",
//     }),
//   };
//   return response;
// };

// export { hello };

import * as serverless from "serverless-http";
import * as express from "express";
import passport from "./lib/passport";

const app = express();

passport(app);

module.exports.server = serverless(app);
