import * as passport from "passport";
import { IOption } from "../types";

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

export const callback = (
  options: IOption,
  successRedirect = "/success",
  failureRedirect = "/fail"
) => [
  passport.authenticate(options.provider, { failureRedirect }),
  async (req: any, res: any) => {
    if (req.isAuthenticated()) {
      try {
        const { user, query } = req;

        console.log("@user: ", user);
        console.log("@query: ", query);
        res.redirect(successRedirect);
      } catch (error) {
        console.error("passport callback is failed", error);
        res.redirect(failureRedirect);
      }
    } else {
      return res.redirect(failureRedirect);
    }
  },
];
