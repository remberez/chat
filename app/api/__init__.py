from fastapi import APIRouter
from .health import router as health_router
from core.config import settings

router = APIRouter(prefix=settings.api.prefix)

router.include_router(health_router)
