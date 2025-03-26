from fastapi import APIRouter

from core.config import settings

router = APIRouter(prefix=settings.api.health)


@router.get("/ping")
async def ping():
    return {"message": "pong"}
