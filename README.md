# DreamLog (드림로그)

> 아이의 하루가 한 편의 동화가 됩니다.

**DreamLog**는 부모가 아이의 하루(장소, 이름, 한 일)를 입력하면 AI가 아이를 주인공으로 한 **기승전결 4단계 동화**를 만들어 주는 웹 서비스입니다. 동화를 다 읽은 뒤에는 동화 요약, **가정 활동 추천**, 아이와 나눌 **추천 대화**를 담은 리포트를 보여 줍니다. 그래서 잠자리 동화가 부모와 아이의 대화로 이어집니다.

멋쟁이사자처럼 아이디어톤에서 개발한 프로젝트입니다.

<img width="2560" height="1600" alt="home" src="https://github.com/user-attachments/assets/b3703bcd-82d9-4a3e-ba94-16e70900b2fc" />


## 서비스 흐름

| 단계 | 화면 | 내용 |
| --- | --- | --- |
| 1 | 홈 | 오늘 날짜, 이번 주 동화 기록, 최근 동화를 보여 주고 새 동화 만들기로 이어집니다 |
| 2 | 동화 만들기 | 오늘 있었던 **장소, 아이 이름, 활동**을 입력합니다. 빈 칸이 있으면 해당 칸으로 이동해 알려 줍니다 |
| 3 | 동화 생성 | AI가 아이를 주인공으로 한 동화를 만듭니다. 기다리는 동안 이모지와 문구가 바뀌며 진행 상황을 보여 줍니다 |
| 4 | 동화 재생 | 기, 승, 전, 결 네 장면을 한 장씩 넘기며 읽습니다 |
| 5 | 리포트 | 동화 요약, 이야기 정보, 가정 활동 추천, 오늘의 추천 대화, 주말 활동 추천을 보여 줍니다 |
| - | 내 책장 | 지금까지 만든 동화를 표지와 함께 모아 보고, 즐겨찾기로 따로 볼 수 있습니다 |

## 화면

<img width="2560" alt="create" src="https://github.com/user-attachments/assets/11dc2667-1bdd-436c-9a91-7ad0291be79a" />
<img width="2560" height="1600" alt="story" src="https://github.com/user-attachments/assets/ddd933a0-b971-4c5c-9967-bfcebb44591d" />
<img width="2560" height="1778" alt="report-full" src="https://github.com/user-attachments/assets/dfa54892-5cfb-4ed1-a405-73d23ed3b7b8" />
<img width="2560" height="1600" alt="bookcase" src="https://github.com/user-attachments/assets/b864e47c-7e2a-4f84-8cd4-f53c9420e124" />


## 주요 기능

- **아이 맞춤 동화 생성**: 장소, 이름, 활동을 넣으면 Gemini가 제목, 기승전결 4단계 본문, 한두 문장 요약을 JSON으로 만들어 줍니다. 각 장면은 아이가 이해하기 쉬운 2~3문장으로 씁니다.
- **장면 단위 동화 읽기**: 단계 표시와 함께 한 장면씩 넘기며 읽고, 다 읽으면 다시 읽기와 리포트 보기를 선택할 수 있습니다.
- **가정 활동 추천**: 동화 생성 시 활동 제목, 설명, 아이에게 건넬 첫 마디, 어울리는 이모지와 배경색을 함께 만들어 리포트에 보여 줍니다.
- **추천 대화와 주말 활동**: 아이 이름에 맞춰 조사(이/가, 은/는 등)를 붙인 대화 질문과 주말 활동을 미리 준비한 목록에서 골라 보여 줍니다. 리포트를 다시 열어도 처음 고른 내용이 유지됩니다.
- **내 책장과 즐겨찾기**: 만든 동화를 표지 이미지로 모아 보고, 별표로 즐겨찾기할 수 있습니다.
- **나레이션 설정 (UI)**: 동화 길이와 나레이션 목소리(엄마 목소리, 기본 목소리)를 고르는 화면이 있습니다. 실제 음성 재생은 아직 구현되지 않았습니다.

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Zustand, Tailwind CSS v4 |
| Backend | Python, FastAPI, Pydantic |
| AI | Google Gemini API (`gemini-2.5-flash`, google-genai SDK) |

## 아키텍처

```
[Next.js] ── POST /story/generate { place, name, activity } ──▶ [FastAPI]
    │                                                              │
    │◀── { title, summary, home_activity, stages[4] } ────────────┤
    │                                                       [Gemini API]
    └─ Zustand 스토어에 입력값과 생성 결과 저장 → 재생, 리포트 화면에서 사용
```

## 프로젝트 구조

```
Babylion-DreamLog/
├── frontend/
│   ├── public/covers/        # 책장 표지 이미지
│   └── src/
│       ├── app/
│       │   ├── page.tsx      # 홈
│       │   ├── create/       # 동화 만들기
│       │   ├── story/        # 동화 생성 및 재생
│       │   ├── report/       # 리포트
│       │   └── bookcase/     # 내 책장
│       ├── components/       # Navbar
│       └── store/            # Zustand 스토어
└── backend/
    ├── main.py               # FastAPI 앱, CORS
    ├── API_SPEC.md           # API 명세
    └── app/
        ├── routers/story.py  # POST /story/generate
        └── services/ai_service.py  # Gemini 프롬프트와 응답 파싱
```

## 로컬 실행

### Backend

```bash
cd backend
python -m venv .venv
./.venv/Scripts/activate        # Windows (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt

cp .env.example .env            # GEMINI_API_KEY 입력
uvicorn main:app --reload       # http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev                     # http://localhost:3000
```

> 백엔드 CORS는 `http://localhost:3000`만 허용하도록 설정되어 있습니다.

## API

| Method | Path | 설명 |
| --- | --- | --- |
| `GET` | `/` | 헬스 체크 |
| `POST` | `/story/generate` | 장소, 이름, 활동을 받아 동화와 가정 활동 추천 생성 |

자세한 요청과 응답 형식은 [API 명세](backend/API_SPEC.md)를 참고하세요.
