# MyBlog 개발 여정 (Journey)

## 빠른 요약

| 영역 | 상태 | 메모 |
|------|------|------|
| Express 서버 | 진행중 | `app.js`에서 미들웨어, 뷰 엔진, 라우터 연결 |
| EJS 레이아웃 | 진행중 | 일반 사용자 레이아웃과 관리자 레이아웃 분리 |
| MongoDB 연결 | 진행중 | `mongoose`로 연결, `.env`의 `MONGODB_URI` 사용 |
| 게시글 조회 | 진행중 | 메인 목록과 상세 페이지 조회 가능 |
| 관리자 인증 | 진행중 | `bcrypt`, `jwt`, `cookie-parser` 기반 로그인 흐름 작성 중 |
| 관리자 게시글 목록 | 수정 필요 | `views/admin/allPosts.ejs` 파일 생성 필요 |

**전체 진행도**: `████████░░` 80%

---

## 아키텍처 관점

### 1. 앱 진입점

`app.js`가 Express 애플리케이션의 시작점이다.

- `.env`를 로드한다.
- `connectDB()`로 MongoDB 연결을 시도한다.
- `express-ejs-layouts`를 등록한다.
- EJS 뷰 엔진과 `views` 디렉토리를 설정한다.
- `public` 디렉토리를 정적 파일 경로로 연결한다.
- JSON, form body, cookie 파싱 미들웨어를 등록한다.
- `routes/main.js`, `routes/admin.js`를 `/` 기준으로 연결한다.

### 2. 계층 구조

현재 프로젝트는 Express MVC에 가까운 구조로 나뉜다.

```text
브라우저 요청
  -> app.js
  -> routes/*.js
  -> models/*.js
  -> MongoDB
  -> views/*.ejs
  -> 브라우저 응답
```

- `routes/`: URL 요청을 받고 어떤 데이터를 조회할지 결정한다.
- `models/`: MongoDB 컬렉션 구조를 Mongoose schema로 정의한다.
- `views/`: EJS 템플릿으로 HTML을 만든다.
- `views/layouts/`: 공통 HTML 틀을 담당한다.
- `public/`: CSS, 이미지 같은 정적 파일을 제공한다.
- `config/`: DB 연결 같은 설정 코드를 둔다.

### 3. 레이아웃 흐름

`express-ejs-layouts`는 실제 페이지 view를 먼저 렌더링한 뒤, 그 결과를 layout의 `<%- body %>` 위치에 넣는다.

```text
res.render("admin/index", { layout: adminLayout })
  -> views/admin/index.ejs 렌더링
  -> views/layouts/admin.ejs의 <%- body %>에 삽입
```

일반 페이지는 `views/layouts/main.ejs`를 사용하고, 관리자 페이지는 `views/layouts/admin.ejs`를 사용한다.

### 4. 인증 흐름

관리자 로그인은 다음 흐름을 목표로 한다.

```text
POST /admin
  -> username으로 User 찾기
  -> bcrypt.compare()로 비밀번호 확인
  -> jwt.sign()으로 토큰 생성
  -> res.cookie("token", token)으로 브라우저에 저장
  -> /allPosts로 이동
```

보호 라우트는 `checkLogin` 미들웨어를 거친다.

```text
GET /allPosts
  -> checkLogin
  -> req.cookies.token 확인
  -> jwt.verify() 성공 시 next()
  -> 게시글 목록 조회
  -> admin/allPosts 렌더링
```

주의할 점:

- `jwt.sign({ id: user.id }, jwtSecret)`로 만들었다면 검증 후에는 `decoded.id`를 사용해야 한다.
- `jwt.sign({ userId: user.id }, jwtSecret)`로 만들었다면 검증 후에는 `decoded.userId`를 사용해야 한다.
- 로그인 실패 응답 뒤에는 `return`을 붙여 아래 코드가 계속 실행되지 않게 해야 한다.

---

## 라우트 관점

### 일반 사용자 라우트

| Method | Path | 파일 | 역할 | View |
|--------|------|------|------|------|
| GET | `/` | `routes/main.js` | 홈 게시글 목록 조회 | `views/index.ejs` |
| GET | `/home` | `routes/main.js` | 홈 게시글 목록 조회 | `views/index.ejs` |
| GET | `/post/:id` | `routes/main.js` | 게시글 상세 조회 | `views/post.ejs` |
| GET | `/about` | `routes/main.js` | 소개 페이지 | `views/about.ejs` |
| GET | `/contact` | `routes/main.js` | 연락 페이지 | `views/contact.ejs` 필요 |

### 관리자 라우트

| Method | Path | 파일 | 역할 | View |
|--------|------|------|------|------|
| GET | `/admin` | `routes/admin.js` | 관리자 로그인 화면 | `views/admin/index.ejs` |
| POST | `/admin` | `routes/admin.js` | 관리자 로그인 처리 | 성공 시 `/allPosts` |
| GET | `/register` | `routes/admin.js` | 관리자 등록 화면 | `views/admin/index.ejs` |
| POST | `/register` | `routes/admin.js` | 관리자 계정 생성 | DB 저장 필요 |
| GET | `/allPosts` | `routes/admin.js` | 관리자 게시글 목록 | `views/admin/allPosts.ejs` 필요 |

### 현재 확인된 라우트 이슈

- `GET /contact`는 `views/contact.ejs`가 없으면 view lookup 에러가 난다.
- `GET /allPosts`는 `views/admin/allPosts.ejs`가 없으면 view lookup 에러가 난다.
- `POST /register`는 `await user.save()` 또는 `User.create()`가 있어야 실제 DB에 저장된다.
- 로그인 실패 처리에는 `return res.status(...).json(...)` 형태가 안전하다.
- `bcrpyt` 변수명은 동작은 가능하지만 오타라서 `bcrypt`로 바꾸는 편이 좋다.

---

## 설치된 패키지

현재 `package.json` 기준 dependency:

| 패키지 | 목적 |
|--------|------|
| `express` | Node.js 웹 서버 프레임워크 |
| `dotenv` | `.env` 환경변수 로드 |
| `ejs` | HTML 템플릿 엔진 |
| `express-ejs-layouts` | EJS 공통 레이아웃 관리 |
| `mongoose` | MongoDB ODM |
| `express-async-handler` | async 라우트 에러 처리 |
| `bcrypt` | 비밀번호 해시 및 비교 |
| `cookie-parser` | `req.cookies` 사용 |
| `jsonwebtoken` | JWT 생성 및 검증 |
| `method-override` | HTML form에서 PUT/DELETE 같은 메서드 흉내내기 |

---

## 설치해야 할 것

### 바로 필요할 수 있는 패키지

```bash
npm i nodemon --save-dev
```

개발 중 서버 자동 재시작용이다. 설치 후 `package.json` scripts에 아래처럼 추가하면 편하다.

```json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  }
}
```

### 테스트를 시작할 때

Jest를 선택하는 경우:

```bash
npm i jest supertest --save-dev
```

Mocha를 선택하는 경우:

```bash
npm i mocha chai supertest --save-dev
```

처음에는 Jest 하나만 먼저 공부하고 적용하는 것을 추천한다. Mocha는 비교 학습용으로 나중에 보면 좋다.

---

## 공부해야 할 것

### 지금 프로젝트에 바로 필요한 주제

- Express middleware: `req`, `res`, `next` 흐름
- Express Router: `app.use()`, `router.get()`, `router.post()`
- EJS: `<%= %>`, `<%- %>`, layout의 `body`
- MongoDB Atlas: DB user, Network Access, connection string
- Mongoose: schema, model, `find`, `findOne`, `create`, `save`
- bcrypt: password hash, salt round, `compare`
- JWT: token payload, `sign`, `verify`, cookie 저장
- cookie-parser: `req.cookies` 구조
- HTTP status code: 200, 302, 401, 404, 500
- 환경변수: `.env`, `process.env`, secret 관리

### 테스트

- Jest: Node.js 프로젝트에서 가장 먼저 적용하기 좋은 테스트 프레임워크
- Supertest: Express route를 실제 HTTP 요청처럼 테스트
- Mocha: 테스트 러너 구조를 이해하기 좋음
- Chai: Mocha와 함께 쓰는 assertion 라이브러리

### 배포

- Cloudtype: Node.js 앱 배포, 환경변수 등록, 배포 로그 확인
- MongoDB Atlas 운영 설정: IP allowlist, DB user 권한, URI 관리

### 다음 백엔드 프레임워크 비교

- Nest.js: Express/Fastify 위에서 동작하는 구조화된 Node.js 프레임워크
- Fastify: 성능과 schema 기반 검증에 강한 Node.js 웹 프레임워크
- Koa.js: Express보다 더 얇고 middleware 흐름이 깔끔한 프레임워크

추천 학습 순서:

```text
Express 기본기
-> MongoDB/Mongoose
-> 인증과 JWT
-> Jest/Supertest
-> Cloudtype 배포
-> Nest.js
-> Fastify
-> Koa.js
-> Mocha 비교 학습
```

---

## 현재 프로젝트 구조

```text
myBlog/
├── app.js
├── config/
│   └── db.js
├── models/
│   ├── Post.js
│   └── Users.js
├── routes/
│   ├── admin.js
│   └── main.js
├── views/
│   ├── about.ejs
│   ├── index.ejs
│   ├── post.ejs
│   ├── admin/
│   │   └── index.ejs
│   └── layouts/
│       ├── admin.ejs
│       └── main.ejs
├── public/
│   ├── css/
│   └── img/
├── AGENTS.md
├── Journey.md
├── package.json
└── package-lock.json
```

---

## 다음 단계 체크리스트

- [x] Express/dotenv 설치
- [x] EJS/express-ejs-layouts 설치
- [x] Mongoose/express-async-handler 설치
- [x] bcrypt 설치
- [x] cookie-parser 설치
- [x] jsonwebtoken 설치
- [x] 일반 라우트 구성
- [x] 관리자 GET `/admin` 라우트 구성
- [x] 관리자 GET/POST `/register` 라우트 구성
- [ ] `views/admin/allPosts.ejs` 생성
- [ ] `views/contact.ejs` 생성 또는 `/contact` 라우트 제거
- [ ] `/register`에서 사용자 저장 로직 확인
- [ ] 로그인 실패 처리에 `return` 추가
- [ ] JWT payload 이름 `id` 또는 `userId`로 통일
- [ ] 관리자 보호 라우트 `checkLogin` 정리
- [ ] 게시글 CRUD 라우트 추가
- [ ] Jest/Supertest 테스트 추가
- [ ] Cloudtype 배포 준비

---

**마지막 업데이트**: 2026-09-02
