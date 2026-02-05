import { delay } from "../../lib/utils/delay";
import { SocketChannel } from "../../managers/socket/socketManager";

SocketChannel.new("hello", async (socket) => {
    await delay(3000)
    await socket.send("test")
})