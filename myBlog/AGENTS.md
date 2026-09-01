# MyBlog 프로젝트 개요

## 📌 프로젝트 타입
Node.js Express 기반 블로그 애플리케이션

## 🛠 기술 스택
- **런타임**: Node.js (CommonJS)
- **프레임워크**: Express.js (v5.2.1)
- **설정 관리**: dotenv (v17.4.2)
- **진입점**: app.js
- **포트**: 3000 (기본값, .env에서 커스터마이징 가능)

## 📝 프로젝트 목적
Express.js를 사용한 블로그 콘텐츠 관리 및 제공 애플리케이션

## 📦 핵심 의존성
- **express**: ^5.2.1 - 웹 서버 프레임워크
- **dotenv**: ^17.4.2 - 환경변수 관리

## 📂 프로젝트 구조
```
myBlog/
├── app.js                 # Express 서버 진입점 (✅ 구현 완료)
├── routes/
│   └── main.js           # 메인 라우트 핸들러 (✅ 구현 완료)
├── assets/               # 정적 파일 디렉토리
├── AGENTS.md             # 이 파일
├── Journey.md            # 개발 진행 기록
└── package.json          # 프로젝트 메타데이터
```

## 🚀 현재 진행 상태
- ✅ 기본 Express 서버 구현 완료
- ✅ 메인 라우트 (GET /) 구현 완료
- 🔲 추가 라우트 작성 대기
- 🔲 데이터베이스 연결 대기
- 🔲 블로그 기능 구현 대기

## 📖 개발 노트
- CommonJS 모듈 시스템 사용
- 환경변수는 .env 파일을 통해 관리
- 라우팅은 routes/ 디렉토리에서 관리
- 서버 실행: `npm start` (아직 package.json에 미등록)
