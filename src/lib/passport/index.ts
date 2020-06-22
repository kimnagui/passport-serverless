import { Express } from "express";
import * as passport from "passport";
import Google, { GoogleUse } from "./strategys/google";
import RefreshToken from "./refresh";
import Logout from "./logout";

export default (app: Express) => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  GoogleUse();
  app.use("/auth/login/google", Google);
  app.use("/auth/refresh_token", RefreshToken);
  app.use("/auth/logout", Logout);
};
