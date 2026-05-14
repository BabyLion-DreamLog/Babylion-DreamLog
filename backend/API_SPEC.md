# DreamLog API 명세서

Base URL: `http://localhost:8000`

---

## 동화 생성

### `POST /story/generate`

프론트엔드에서 아이의 하루 정보를 받아 AI로 동화를 생성합니다.

#### Request

**Headers**
```
Content-Type: application/json
```

**Body**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| place | string | ✅ | 오늘 있었던 장소 (예: 유치원 운동장) |
| name | string | ✅ | 주인공 이름 (예: 지우) |
| activity | string | ✅ | 오늘 한 활동 (예: 나비를 처음 봤어요) |

**예시**
```json
{
  "place": "유치원 운동장",
  "name": "지우",
  "activity": "나비를 처음 봤어요"
}
```

#### Response

**200 OK**
| 필드 | 타입 | 설명 |
|------|------|------|
| title | string | 동화 제목 |
| stages | array | 기승전결 4단계 배열 |
| stages[].label | string | "기" / "승" / "전" / "결" |
| stages[].text | string | 해당 단계의 동화 내용 |

```json
{
  "title": "나비를 처음 만난 날",
  "stages": [
    { "label": "기", "text": "..." },
    { "label": "승", "text": "..." },
    { "label": "전", "text": "..." },
    { "label": "결", "text": "..." }
  ]
}
```

**400 Bad Request** — 필수 필드 누락
```json
{
  "detail": "place, name, activity는 필수입니다."
}
```

---

## 헬스 체크

### `GET /`

서버 상태 확인용

**Response**
```json
{
  "status": "ok"
}
```
