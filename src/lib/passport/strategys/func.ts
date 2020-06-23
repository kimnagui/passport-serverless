import * as passport from "passport";
import { IOption } from "../types";

const {
  SUCCESS_REDIRECT_URL = "/auth/success",
  FAIL_REDIRECT_URL = "/auth/fail",
} = process.env;

export const authenticate = (options: IOption) => {
  return (req: any, res: any, next: any) => {
    const { state = "" } = req.query;
    const authenticator = passport.authenticate(options.provider, {
      session: false,
      scope: options.scope,
      state,
    });
    authenticator(req, res, next);
  };
};

export const callback = (options: IOption) => [
  passport.authenticate(options.provider, {
    failureRedirect: FAIL_REDIRECT_URL,
  }),
  async (req: any, res: any) => {
    if (req.isAuthenticated()) {
      try {
        const { user, query } = req;

        console.log("@user: ", user);
        console.log("@query: ", query);
        res.redirect(SUCCESS_REDIRECT_URL);
      } catch (error) {
        console.error("passport callback is failed", error);
        res.redirect(FAIL_REDIRECT_URL);
      }
    } else {
      return res.redirect(FAIL_REDIRECT_URL);
    }
  },
];
