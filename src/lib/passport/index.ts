import { Express } from "express";
import * as passport from "passport";
import Google, { GoogleUse } from "./strategys/google";
import RefreshToken from "./refresh";
import Logout from "./logout";

const {
  GOOGLE_AUTH_LOGIN_URL = "/auth/login/google",
  REFRESH_TOKEN_URL = "/auth/refresh_token",
  LOGOUT_URL = "/auth/logout",
} = process.env;

export default (app: Express) => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  GoogleUse();
  app.use(GOOGLE_AUTH_LOGIN_URL, Google);
  app.use(REFRESH_TOKEN_URL, RefreshToken);
  app.use(LOGOUT_URL, Logout);
};
