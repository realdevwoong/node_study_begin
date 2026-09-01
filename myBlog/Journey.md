# MyBlog 개발 여정 (Journey)

## � 빠른 요약 (Quick Summary)
| 항목 | 상태 | 진행도 |
|------|------|--------|
| 의존성 설치 | ✅ 완료 | 100% |
| 폴더 구조 생성 | ✅ 완료 | 100% |
| app.js 작성 | ✅ 완료 | 100% |
| 라우팅 설정 | ✅ 완료 | 100% |
| 뷰 엔진 설정 | ✅ 완료 | 100% |
| 템플릿 파일 작성 | ✅ 완료 | 100% |
| UI 구현 | ✅ 완료 | 100% |
| **MongoDB 연결** | **⚠️ 진행중** | **50%** |

**전체 진행도**: `██████████░` 95% (인증 해결 대기중)

---

## 📑 목차
1. [작업 기록](#-작업-기록)
2. [프로젝트 타임라인](#-프로젝트-타임라인)
3. [프로젝트 구조](#-현재-프로젝트-구조)
4. [기록 규칙](#-기록-규칙)
5. [체크리스트](#-다음-단계-체크리스트)

---

## 📋 작업 기록

### 1️⃣ npm i express dotenv
**날짜**: 2026-09-01  
**목적**: Express.js (웹 프레임워크)와 dotenv (환경변수 관리) 설치  
**상태**: ✅ 완료  
**설명**: 블로그 프로젝트 초기 의존성 설치  
**변경사항**: 
- ✅ package-lock.json 생성
- ✅ node_modules/ 디렉토리 생성

### 2️⃣ app.js & routes 디렉토리 구조 생성
**날짜**: 2026-09-01  
**목적**: Express 진입점과 라우팅 구조 설정  
**상태**: ✅ 완료  
**설명**: 기본 폴더 구조 및 파일 생성  
**변경사항**:
- ✅ app.js 파일 생성
- ✅ routes/ 디렉토리 생성
- ✅ routes/main.js 생성
- ✅ assets/ 디렉토리 생성

### 3️⃣ app.js 초기화 및 Express 서버 설정
**날짜**: 2026-09-01  
**목적**: Express 서버의 기본 설정 및 초기화  
**상태**: ✅ 완료  
**설명**: dotenv 로드, Express 앱 생성, 포트 설정, 라우팅 연결  
**변경사항**:
- ✅ dotenv 환경변수 로드 (`require("dotenv").config()`)
- ✅ express 모듈 import
- ✅ 포트 설정 (기본값: 3000, .env에서 커스터마이징 가능)
- ✅ /routes/main 라우트 연결
- ✅ 서버 listen 설정 및 콘솔 메시지

### 4️⃣ routes/main.js 라우트 핸들러 구현
**날짜**: 2026-09-01  
**목적**: 기본 라우트 핸들러 작성  
**상태**: ✅ 완료  
**설명**: GET / 라우트로 환영 메시지 반환  
**변경사항**:
- ✅ 일반인용 라우터 생성 (주석: //일반인이 사용할 라우터)
- ✅ GET '/' 라우트 핸들러 작성
- ✅ 'Welcome to the main route!' 응답 메시지

### 5️⃣ npm i ejs express-ejs-layouts
**날짜**: 2026-09-01  
**목적**: 뷰 엔진(EJS)과 레이아웃 라이브러리 설치  
**상태**: ✅ 완료  
**설명**: Express 애플리케이션에 동적 뷰 렌더링 및 레이아웃 기능 추가  
**변경사항**:
- ✅ ejs (^6.0.1) 설치 - 템플릿 엔진
- ✅ express-ejs-layouts (^2.5.1) 설치 - 레이아웃 관리
- ✅ package.json 의존성 자동 업데이트

### 6️⃣ routes/main.js 라우트 확장 및 버그 수정
**날짜**: 2026-09-01  
**목적**: 메인 라우터에 home, about 라우트 추가 및 에러 수정  
**상태**: ✅ 완료  
**설명**: EJS 렌더링으로 변경, 라우트 확장, 코드 버그 수정  
**변경사항**:
- ✅ 빈 `router.get([])` 제거 (TypeError 원인 제거)
- ✅ 중복 `module.exports` 제거 (라우트 로드 순서 수정)
- ✅ `moudule.exports` 오타 수정 → `module.exports`
- ✅ GET ["/", "/home"] 라우트 추가 - index 페이지 렌더링
- ✅ GET "/about" 라우트 추가 - about 페이지 렌더링
- ✅ mainLayout 레이아웃 경로 설정: "../views/layouts/main.ejs"

### 7️⃣ app.js EJS 설정 완료
**날짜**: 2026-09-01  
**목적**: EJS 뷰 엔진을 Express에 등록 및 설정  
**상태**: ✅ 완료  
**설명**: 동적 뷰 렌더링을 위한 EJS 설정 및 뷰 디렉토리 등록  
**변경사항**:
- ✅ express-ejs-layouts 모듈 import
- ✅ `app.use(expressLayouts)` - 레이아웃 미들웨어 등록
- ✅ `app.set("view engine", "ejs")` - 뷰 엔진으로 EJS 설정
- ✅ `app.set("views", "./views")` - 뷰 디렉토리 설정

### 8️⃣ views 디렉토리 및 템플릿 파일 작성
**날짜**: 2026-09-01  
**목적**: EJS 템플릿 파일 작성으로 동적 페이지 렌더링 구현  
**상태**: ✅ 완료  
**설명**: 레이아웃 및 페이지 템플릿 작성 (기본 구조)
**변경사항**:
- ✅ views/ 디렉토리 생성
- ✅ views/layouts/ 디렉토리 생성
- ✅ views/layouts/main.ejs 작성 (기본 레이아웃)
- ✅ views/index.ejs 작성 (홈 페이지)
- ✅ views/about.ejs 작성 (어바웃 페이지)

### 9️⃣ 템플릿 파일 상세 구현
**날짜**: 2026-09-01  
**목적**: 블로그 레이아웃 및 페이지 디자인 완성  
**상태**: ✅ 완료  
**설명**: 한글 기반 블로그 템플릿 구현, 헤더 및 네비게이션 추가
**변경사항**:
- ✅ views/layouts/main.ejs 업그레이드:
  - DOCTYPE html 구조 (언어: 한국어)
  - 메타 태그 추가 (charset, viewport, description)
  - CSS 링크 추가 (`/css/style.css`)
  - 헤더 구현 (로고 "오후의 블로그", 네비게이션)
  - container div 래퍼 추가
  - 상단 메뉴: Home, About 링크
- ✅ views/index.ejs 확장:
  - 상단 소개글 섹션 (히어로 텍스트)
  - "하루하루 스터디" 제목
  - "매일 1시간씩 공부한 내용을 기록하고 있습니다." 설명
  - 히어로 이미지 추가 (`/img/top-hero.jpg`)
  - 최근 게시물 섹션 (articles)
  - 게시물 리스트 예제 포함 (제목, 날짜)
- ⏳ views/about.ejs: 기본 구조만 유지 (향후 확장 예정)

### 1️⃣0️⃣ npm i mongoose express-async-handler & MongoDB 연결 설정
**날짜**: 2026-09-01  
**목적**: MongoDB 데이터베이스 연결을 위한 의존성 설치 및 설정  
**상태**: ⚠️ 진행중  
**설명**: Mongoose ODM과 비동기 핸들러 설치, DB 연결 구성  
**변경사항**:
- ✅ mongoose 설치 - MongoDB ODM
- ✅ express-async-handler 설치 - 비동기 에러 핸들링
- ✅ config/db.js 오타 수정: `conn.connection.host` → `connect.connection.host`
- ✅ .env 파일에 MONGODB_URI 설정
- ⚠️ MongoDB 인증 실패 (bad auth) - 비밀번호 또는 IP 화이트리스트 확인 필요

---

## 📅 프로젝트 타임라인

| 날짜 | 마일스톤 | 설명 |
|------|---------|------|
| 2026-09-01 | 🚀 프로젝트 시작 | 초기 의존성 설치 및 폴더 구조 생성 |
| 2026-09-01 | ✅ 서버 구현 완료 | app.js 초기화 및 기본 라우팅 구현 |
| 2026-09-01 | 🎨 뷰 엔진 설치 | EJS 및 레이아웃 라이브러리 추가 |
| 2026-09-01 | 🐛 버그 수정 | routes/main.js 에러 수정 |
| 2026-09-01 | ✅ EJS 설정 완료 | app.js EJS 뷰 엔진 설정 및 라우트 확장 완료 |
| 2026-09-01 | 📄 템플릿 작성 완료 | views 디렉토리 및 EJS 템플릿 파일 작성 완료 |
| 2026-09-01 | 🎨 UI 구현 | 블로그 레이아웃 및 상세 템플릿 작성 |
| 2026-09-01 | 🗄️ MongoDB 설정 중 | Mongoose 설치, DB 연결 구성 (인증 에러 발생) |
| - | ⏳ 다음 단계 | MongoDB 인증 해결 및 CSS 스타일링 |

**Journey 모드**: 🔴 활성화 - 모든 작업 기록 중

---

## 📁 현재 프로젝트 구조

```
myBlog/
│
├── 📄 app.js                 (Express 진입점 - ✅ 완료)
│   ├── dotenv 로드
│   ├── express 설정
│   ├── EJS 설정 (✅ 완료)
│   └── /routes/main 연결
│
├── 📁 routes/                (라우트 핸들러)
│   └── 📄 main.js             (메인 라우트 - ✅ 완료)
│       ├── GET ["/" , "/home"] → index 렌더링
│       └── GET "/about" → about 렌더링
│
├── 📁 views/                 (EJS 템플릿 디렉토리 - ✅ 완료)
│   ├── index.ejs (홈 페이지)
│   ├── about.ejs (어바웃 페이지)
│   └── layouts/
│       └── main.ejs (기본 레이아웃)
│
├── 📁 public/                (정적 파일 - 🔲 생성됨)
│   ├── css/
│   ├── js/
│   └── images/
│
├── 📁 config/                (설정 파일 - 🔲 생성됨)
│
├── 📁 models/                (데이터 모델 - 🔲 생성됨)
│
├── 📁 assets/                (자산 폴더 - 🔲 생성됨)
│
├── 📄 AGENTS.md              (프로젝트 정보용)
├── 📄 Journey.md             (개발 기록 - 이 파일)
├── 📄 package.json
├── 📄 package-lock.json
│
└── 📁 node_modules/          (의존성 폴더)
```

**범례**:
- ✅ = 완료된 작업 (코드 작성 완료)
- 🔲 = 파일 생성됨 (코드 미작성)
- ⏳ = 진행 중
- 💾 = 대기 중

---

## 📝 기록 규칙

앞으로 작업할 때 이 순서대로 기록합니다:

```
### #️⃣ [번호] [명령어 또는 작업명]
**날짜**: YYYY-MM-DD  
**목적**: 왜 이 작업을 했는지  
**상태**: ✅ 완료 / ⚠️ 진행중 / ❌ 실패  
**설명**: 구체적인 작업 내용  
**변경사항**: 
- ✅ 추가된 파일
- ✅ 수정된 파일
- ✅ 실행된 명령어
```

---

## ✅ 다음 단계 체크리스트

- [x] **1️⃣ npm i express dotenv**: Express와 dotenv 설치
- [x] **2️⃣ 폴더 구조 생성**: app.js, routes/, 기타 폴더 생성
- [x] **3️⃣ app.js 초기화**: Express 서버 기본 설정
- [x] **4️⃣ routes/main.js 구현**: 기본 라우트 핸들러 작성
- [x] **5️⃣ npm i ejs express-ejs-layouts**: 뷰 엔진 설치
- [x] **6️⃣ routes/main.js 확장 & 버그 수정**: 라우트 확장 및 에러 수정
- [x] **7️⃣ app.js EJS 설정 완료**: EJS 뷰 엔진 등록 및 설정
- [x] **8️⃣ views 디렉토리 생성**: 템플릿 파일 작성 (layout.ejs, index.ejs, about.ejs)
- [x] **9️⃣ 템플릿 파일 상세 구현**: 블로그 UI 레이아웃 및 컨텐츠 작성
- [x] **🔟 npm i mongoose express-async-handler**: MongoDB 의존성 설치
- [ ] **1️⃣1️⃣ MongoDB 인증 해결**: 비밀번호 재확인 및 IP 화이트리스트 설정
- [ ] **1️⃣2️⃣ public 디렉토리 구성**: CSS, JS, 이미지 파일 추가
- [ ] **1️⃣3️⃣ CSS 스타일링**: style.css 작성 및 페이지 디자인
- [ ] **1️⃣4️⃣ npm start 테스트**: 서버 실행 및 모든 페이지 확인

---

**마지막 업데이트**: 2026-09-01
