from fastapi.routing import APIRouter
from fastapi.websockets import WebSocket
from starlette.websockets import WebSocketDisconnect

from .ws.chat_manager import ws_manager

router = APIRouter(prefix="/chat")


@router.websocket("/{room_id}")
async def start_chat(room_id: int, ws: WebSocket, username: str):
    await ws_manager.accept(ws, room_id)

    try:
        while True:
            message = await ws.receive_text()
            await ws_manager.broadcast(message, room_id, username)
    except WebSocketDisconnect:
        await ws_manager.disconnect(ws)
