# serverless aws lambda nodejs passport

> 아직 작성 및 개발 중..

AWS Lambda와 Serverless 프레임워크를 활용하여 Cookie-JWT 방식의 passport 소셜간편로그인 구현.

## USAGE

### 0. 사전 준비

- serverless 패키지 설치 : [참고 링크](https://www.serverless.com/framework/docs/getting-started/)
- 인증(AWS) 설정 : [참고 링크](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)

### 1. stage 환경변수 설정

- 기본 개발용 stag는 `serverless.yml`에 **dev**로 설정되있으며, stage별 환경변수는 `src/config` 디렉토리에 `stag이름.js` 파일로 설정.

```yml
# serverless.yml

provider:
  name: aws
  runtime: nodejs12.x
  region: ap-northeast-2
  stage: ${opt:stage, 'dev'} # <-- Default Stage "dev"
```

```js
// src/config/dev.js

module.exports.ENV = (serverless) => ({
  URL: "http://localhost:4000",

  TOKEN_SECRET_KEY: "YourSecretKey",
  TOKEN_ACCESS_EXPIRES: "1h",
  TOEKN_REFRESH_EXPIRES: "14d",

  REFRESH_TOKEN_URL: "/auth/refresh_token",
  LOGOUT_URL: "/auth/logout",

  SUCCESS_REDIRECT_URL: "http://localhost:4000/auth/success",
  FAIL_REDIRECT_URL: "http://localhost:4000/auth/fail",
  LOGOUT_REDIRECT_URL: "http://localhost:3000/auth/logout/complete",

  GOOGLE_AUTH_CLIENT_ID: "your google oauth client id",
  GOOGLE_AUTH_CLIENT_SECRET: "your google oauth client secret",
  GOOGLE_AUTH_LOGIN_URL: "/auth/login/google",
  /**
   * If stage is 'dev', full callback url is 'http://localhost:4000/dev' + GOOGLE_AUTH_LOGIN_URL + GOOGLE_AUTH_LOGIN_CALLBACK.
   *
   * If stage is not 'dev', full callback url is URL + GOOGLE_AUTH_LOGIN_URL + GOOGLE_AUTH_LOGIN_CALLBACK.
   */
  GOOGLE_AUTH_LOGIN_CALLBACK: "/callback",
});
```

- 환경변수의 추가가 필요한 경우 `(stage 이름).js`와 `serverless.yml > provider.environment` 를 수정.
- 기본 stage가 아닌 다른 stage로 실행 또는 배포하고자 할때는 serverless 명령에 옵션으로 `--stage (stage 이름)` 추가.

### 2. Callback 작성

##### (1) Verify Callback

```js
// src/lib/passport/strategys/func.ts

export const verify = (profile: any, done: any) => {
  // Verify Callback Example
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return done(err, user);
  // });
  return done(null, profile);
};
```

##### (2) Authentication Callback

```js
// src/lib/passport/strategys/func.ts

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
```

### 3. 오프라인 실행

- 로컬 개발환경에서 테스트

```console
$ serverless offline
...
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                                                                          │
   │   GET | http://localhost:4000/dev/auth/refresh_token                     │
   │   POST | http://localhost:4000/2015-03-31/functions/server/invocations   │
   │   GET | http://localhost:4000/dev/auth/logout                            │
   │   POST | http://localhost:4000/2015-03-31/functions/server/invocations   │
   │   GET | http://localhost:4000/dev/auth/login/google                      │
   │   POST | http://localhost:4000/2015-03-31/functions/server/invocations   │
   │   GET | http://localhost:4000/dev/auth/login/google/callback             │
   │   POST | http://localhost:4000/2015-03-31/functions/server/invocations   │
   │                                                                          │
   └──────────────────────────────────────────────────────────────────────────┘
...
```

### 4. Custom Domain 설정

- 별도의 도메인으로 배포 하려면 `serverless-domain-manager` 플러그인이 필요.
- 설정에 대한 자세한 내용은 [[serverless-domain-manager Git]](https://github.com/amplify-education/serverless-domain-manager) 을 참고.

##### (1) config

```js
// src/config/dev.js

module.exports.DOMAIN = (serverless) => ({
  domainName: "", // ex) api.nagui.me
  hostedZoneId: "", // AWS Route-53 hosted-zone ID
  certificateName: "", // ex) "*.nagui.me"
  certificateArn: "", // ACM us-east-1 ARN
  basePath: "", // ex) ""
  stage: "", // ex) ${opt:stage, 'dev'}
  createRoute53Record: "", // ex) true
});
```

##### (2) create domain

- 해당 도메인으로 배포하기 전에 AWS Route-53과 Api Gateway에 레코드와 맵핑 생성

```console
$ sls create_domain --aws-profile (aws profile 이름) --stage (stage 이름)
```

##### (3) delete domain

- 도메인 삭제가 필요할시

```console
$ sls delete_domain --aws-profile (aws profile 이름) --stage (stage 이름)
```

### 5. 배포

```console
$ sls deploy --aws-profile (aws profile 이름) --stage (stage 이름)
```
