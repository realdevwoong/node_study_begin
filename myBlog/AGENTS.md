# MyBlog 프로젝트 개요

## 📌 프로젝트 타입
Node.js Express 기반 블로그 애플리케이션

## 🛠 기술 스택
- **런타임**: Node.js (CommonJS)
- **프레임워크**: Express.js (v5.2.1)
- **뷰 엔진**: EJS (v6.0.1) - 템플릿 렌더링
- **레이아웃**: express-ejs-layouts (v2.5.1) - 페이지 레이아웃 관리
- **설정 관리**: dotenv (v17.4.2)
- **진입점**: app.js
- **포트**: 3000 (기본값, .env에서 커스터마이징 가능)

## 📝 프로젝트 목적
Express.js를 사용한 블로그 콘텐츠 관리 및 제공 애플리케이션

## 📦 핵심 의존성
- **express**: ^5.2.1 - 웹 서버 프레임워크
- **ejs**: ^6.0.1 - 템플릿 엔진
- **express-ejs-layouts**: ^2.5.1 - 레이아웃 관리
- **dotenv**: ^17.4.2 - 환경변수 관리

## 📂 프로젝트 구조
```
myBlog/
├── app.js                 # Express 서버 진입점 (✅ 구현 완료)
├── routes/
│   └── main.js           # 메인 라우트 핸들러 (✅ 구현 완료)
├── views/                # EJS 템플릿 (✅ 작성 완료)
│   ├── index.ejs
│   ├── about.ejs
│   └── layouts/
│       └── main.ejs
├── public/               # 정적 파일 (CSS, JS, 이미지)
├── config/               # 설정 파일
├── models/               # 데이터 모델
├── assets/               # 프로젝트 자산
├── AGENTS.md             # 이 파일
├── Journey.md            # 개발 진행 기록
└── package.json          # 프로젝트 메타데이터
```

## 🚀 현재 진행 상태
- ✅ 기본 Express 서버 구현 완료
- ✅ 메인 라우트 (GET /, /home, /about) 구현 완료
- ✅ 뷰 엔진(EJS) 및 레이아웃 라이브러리 설치 완료
- ✅ app.js EJS 설정 완료
- ✅ views 디렉토리 및 템플릿 파일 작성 완료 (layout.ejs, index.ejs, about.ejs)
- 🔲 public 디렉토리 정적 파일 구성 대기
- 🔲 데이터베이스 연결 대기
- 🔲 블로그 기능 구현 대기

## 📖 개발 노트
- CommonJS 모듈 시스템 사용
- 환경변수는 .env 파일을 통해 관리
- 뷰 엔진으로 EJS 사용, express-ejs-layouts로 레이아웃 관리
- 라우팅은 routes/ 디렉토리에서 관리
- 정적 파일은 public/ 디렉토리에서 관리
- 서버 실행: `npm start` (아직 package.json에 미등록)
- 포트: 기본값 3000 (프로덕션은 .env 파일로 커스터마이징)
