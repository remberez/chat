from fastapi.websockets import WebSocket
from dataclasses import dataclass


@dataclass
class Client:
    websocket: WebSocket
    name: str | None = None
    room: int | None = None


class WebSocketChatManager:
    def __init__(self):
        self.clients: list[Client] = []

    async def accept(self, websocket: WebSocket) -> None:
        await websocket.accept()
        data = await websocket.receive_json()
        name, room = data.get('name', None), data.get('room', None)

        if name and room:
            self.clients.append(Client(websocket=websocket, name=name, room=room))
        else:
            await websocket.close()


ws_manager = WebSocketChatManager()
