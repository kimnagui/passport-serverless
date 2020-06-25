module.exports.CONFIG = (serverless) => ({
  URL: "http://localhost:4000",

  TOKEN_SECRET_KEY: "YourSecretKey",
  TOKEN_ACCESS_EXPIRES: "1h",
  TOEKN_REFRESH_EXPIRES: "14d",

  REFRESH_TOKEN_URL: "/auth/refresh_token",
  LOGOUT_URL: "/auth/logout",

  SUCCESS_REDIRECT_URL: "http://localhost:3000/auth/success",
  FAIL_REDIRECT_URL: "http://localhost:3000/auth/fail",
  LOGOUT_REDIRECT_URL: "http://localhost:3000/auth/logout/complete",

  GOOGLE_AUTH_CLIENT_ID: "your google oauth client id",
  GOOGLE_AUTH_CLIENT_SECRET: "your google oauth client secret",
  GOOGLE_AUTH_LOGIN_URL: "/auth/login/google",
  /**
   * If stage is 'dev', full callback url is 'http://localhost:3000/dev' + GOOGLE_AUTH_LOGIN_URL + GOOGLE_AUTH_LOGIN_CALLBACK.
   *
   * If stage is not 'dev', full callback url is URL + GOOGLE_AUTH_LOGIN_URL + GOOGLE_AUTH_LOGIN_CALLBACK.
   */
  GOOGLE_AUTH_LOGIN_CALLBACK: "/callback",
});
