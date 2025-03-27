from fastapi.websockets import WebSocket


class WebSocketChatManager:
    def __init__(self, websocket: WebSocket):
        self.websocket = websocket
        self.name = None
        self.room = None

    async def initialize_data(self):
        data = await self.websocket.receive_json()
        self.name = data.get("name")
        self.room = data.get("room")
