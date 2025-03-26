import uvicorn
from fastapi import FastAPI
from core.config import settings
from api import router

app = FastAPI()
app.include_router(router)

if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host=settings.run.host,
        port=settings.run.port,
        reload=settings.run.reload,
    )
