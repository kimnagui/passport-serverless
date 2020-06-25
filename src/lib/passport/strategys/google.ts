import { Router } from "express";
import * as passport from "passport";
import * as google from "passport-google-oauth";
import { verify, authenticate, callback } from "./func";

const {
  URL = "http://localhost:4000",
  STAGE = "dev",
  GOOGLE_AUTH_CLIENT_ID: clientID = "",
  GOOGLE_AUTH_CLIENT_SECRET: clientSecret = "",
  GOOGLE_AUTH_LOGIN_URL: loginUrl = "/auth/login/google",
  GOOGLE_AUTH_LOGIN_CALLBACK: loginCallback = "/callback",
} = process.env;

const callbackURL = `${URL}${
  STAGE === "dev" ? "/dev" : ""
}${loginUrl}${loginCallback}`;

export const GoogleUse = () => {
  passport.use(
    new google.OAuth2Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        // Verify Callback Example
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        const { sub, name, email, picture: avatar, locale } = profile._json;
        const newProfile = {
          userId: "google_" + sub,
          provider: "google",
          name,
          email,
          avatar,
          locale,
        };
        // return done(null, newProfile);
        verify(newProfile, done);
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
router.get(loginCallback, callback(Option));

export default router;
