import { Router } from "express";
import * as passport from "passport";
import * as google from "passport-google-oauth";
import { authenticate, callback } from "./func";

const {
  URL = "http://localhost:3000",
  STAGE = "dev",
  GOOGLE_AUTH_CLIENT_ID = "",
  GOOGLE_AUTH_CLIENT_SECRET = "",
  GOOGLE_AUTH_CLIENT_CALLBACK_URL = "",
} = process.env;

export const GoogleUse = () => {
  passport.use(
    new google.OAuth2Strategy(
      {
        clientID: GOOGLE_AUTH_CLIENT_ID,
        clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
        callbackURL: URL + "/" + STAGE + GOOGLE_AUTH_CLIENT_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const { sub, name, email, picture: avatar, locale } = profile._json;
        const newProfile = {
          userId: "google_" + sub,
          provider: "google",
          name,
          email,
          avatar,
          locale,
        };
        return done(null, newProfile);
      }
    )
  );
};

const Option = {
  provider: "google",
  scope: ["openid", "profile", "email"],
};

const router = Router();
router.get("/", authenticate(Option));
router.get("/callback", callback(Option));

export default router;
