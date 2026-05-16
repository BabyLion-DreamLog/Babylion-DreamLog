import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import generate_story

router = APIRouter(prefix="/story", tags=["story"])


class StoryRequest(BaseModel):
    place: str
    name: str
    activity: str


class Stage(BaseModel):
    label: str
    text: str


class StoryResponse(BaseModel):
    title: str
    summary: str
    stages: list[Stage]


@router.post("/generate", response_model=StoryResponse)
async def create_story(request: StoryRequest):
    if not all([request.place, request.name, request.activity]):
        raise HTTPException(status_code=400, detail="place, name, activity는 필수입니다.")

    try:
        result = generate_story(
            place=request.place,
            name=request.name,
            activity=request.activity,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}")
