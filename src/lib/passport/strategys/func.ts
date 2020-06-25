import * as passport from "passport";
import { IOption } from "../types";
import createToken from "../../token/createToken";
import ms = require("ms");

const {
  STAGE = "dev",
  SUCCESS_REDIRECT_URL = "/auth/success",
  FAIL_REDIRECT_URL = "/auth/fail",
  TOKEN_ACCESS_EXPIRES = "1h",
} = process.env;

export const verify = (profile: any, done: any) => {
  // Verify Callback Example
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return done(err, user);
  // });
  return done(null, profile);
};

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
    // Authentication Callback Example
    if (req.isAuthenticated()) {
      try {
        const { user } = req; // user, query

        const token = createToken({
          expiresIn: TOKEN_ACCESS_EXPIRES,
          payload: user,
        });

        res.cookie("token", token, {
          //   domain: "",
          secure: STAGE !== "dev",
          httpOnly: true,
          maxAge: ms(TOKEN_ACCESS_EXPIRES) / 1000,
        });

        res.redirect(SUCCESS_REDIRECT_URL);
      } catch (error) {
        console.error("[ERROR] passport callback is failed: ", error);
        res.redirect(FAIL_REDIRECT_URL);
      }
    } else {
      return res.redirect(FAIL_REDIRECT_URL);
    }
  },
];
