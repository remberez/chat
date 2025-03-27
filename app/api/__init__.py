from fastapi import APIRouter
from .health import router as health_router
from core.config import settings
from .chat import router as chat_router

router = APIRouter(prefix=settings.api.prefix)


router.include_router(health_router)
router.include_router(chat_router)
