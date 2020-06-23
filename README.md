# serverless aws lambda nodejs passport

> 아직 작성 및 개발 중..

## USE

#### 1. stage 환경변수 설정

- 기본 stag는 `serverless.yml`에 **sample**로 설정되있으며 원하는데로 수정 가능 (ex. **dev**)

```yml
custom:
  STAGE: ${self:provider.stage}
  CONFIG: ${file(./src/config/${opt:stage, self:provider.stage, 'sample'}.js):CONFIG} # <-- Change 'sample' to 'dev'

provider:
  name: aws
  runtime: nodejs12.x
  region: ap-northeast-2
  stag: ${opt:stage, 'sample'} # <-- Change 'sample' to 'dev'
```

- `src/config/sample.js` 파일의 내용을 복사하고 각 변수 별로 내용을 수정해서 `stage이름.js`(ex. `dev.js`)으로 파일 생성

> **[ 다른 stage 추가하기 ]**
> 위에서 `src/config/dev.js` 라는 파일을 생성하듯이 원하는 stage 이름으로 파일을 생성

## TO-DO

- [ ] jwt
  - [ ] login
  - [ ] refresh token
  - [ ] logout
- [ ] custom domain + ssl
