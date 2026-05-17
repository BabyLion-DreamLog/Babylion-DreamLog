import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1"},
)


def generate_story(place: str, name: str, activity: str) -> dict:
    prompt = f"""
아이를 위한 동화를 한국어로 작성해주세요.

조건:
- 주인공 이름: {name}
- 장소: {place}
- 활동: {activity}

아래 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요.

{{
  "title": "동화 제목",
  "summary": "동화 전체 내용을 시적으로 1~2문장으로 요약. 예: '{name}가 {place}에서 {activity}하며 작은 용기를 발견한 이야기'",
  "home_activity": {{
    "title": "가정 활동 제목 (10자 이내)",
    "description": "활동 설명 한 줄 (예: 관찰력과 표현력을 함께 기르는 활동)",
    "tip": "아이에게 건네는 시작 멘트 (예: '오늘 만난 나비한테 그림 그려줄까?')",
    "emoji": "활동과 어울리는 이모지 1개",
    "color": "이모지 배경색 hex 코드 (파스텔 톤 권장, 예: #FFD6B0)"
  }},
  "stages": [
    {{ "label": "기", "text": "이야기 시작 부분" }},
    {{ "label": "승", "text": "이야기 전개 부분" }},
    {{ "label": "전", "text": "이야기 위기/전환 부분" }},
    {{ "label": "결", "text": "이야기 마무리 부분" }}
  ]
}}

각 stage의 text는 2~3문장으로 작성하고, 아이가 이해하기 쉬운 따뜻한 문체로 써주세요.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = response.text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    return json.loads(text)
