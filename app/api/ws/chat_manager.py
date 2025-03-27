import json
from dataclasses import dataclass

from fastapi.websockets import WebSocket

RoomId = int


@dataclass
class Client:
    websocket: WebSocket
    room_id: RoomId


class WebSocketChatManager:
    def __init__(self):
        self.clients: list[Client] = []

    async def accept(self, websocket: WebSocket, room_id: RoomId) -> None:
        await websocket.accept()
        self.clients.append(Client(websocket, room_id))

    async def broadcast(self, message: str, room: RoomId, username: str) -> None:
        for client in self.clients:
            if client.room_id == room:
                await client.websocket.send_text(json.dumps({"message": message, "username": username}))

    async def disconnect(self, ws: WebSocket) -> None:
        for client in self.clients:
            if client.websocket == ws:
                self.clients.remove(client)
                break


ws_manager = WebSocketChatManager()
