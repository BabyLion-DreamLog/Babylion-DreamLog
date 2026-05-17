import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import story

app = FastAPI(title="DreamLog API")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(story.router)


@app.get("/")
def health_check():
    return {"status": "ok"}
