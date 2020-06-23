module.exports.CONFIG = (serverless) => ({
  URL: "http://localhost:3000",

  REFRESH_TOKEN_URL: "/auth/refresh_token",
  LOGOUT_URL: "/auth/logout",

  SUCCESS_REDIRECT_URL: "/auth/success",
  FAIL_REDIRECT_URL: "/auth/fail",

  GOOGLE_AUTH_CLIENT_ID: "your google oauth client id",
  GOOGLE_AUTH_CLIENT_SECRET: "your google oauth client secret",
  GOOGLE_AUTH_LOGIN_URL: "/auth/login/google",
  /**
   * callback URL 설정
   * @desc callback URL은 URL + STAGE + GOOGLE_AUTH_LOGIN_URL + GOOGLE_AUTH_LOGIN_CALLBACK_URL 으로 설정된다, 프로바이더 플랫폼에서도 해당 값으로 입력해야 한다.
   * @example - "http://localhost:3000/dev/auth/login/google/callback"
   */
  GOOGLE_AUTH_LOGIN_CALLBACK_URL: "/callback",
});
