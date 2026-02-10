import {io, type Socket} from "socket.io-client";

//Socket Client
const socket = io("ws://localhost:8000", {
    transports: ["websocket"],
    withCredentials: true,
});
export default defineNuxtPlugin(() => {
    socket.on("connect", () => console.log('connect', socket.id))
    return {
        provide: {
            io: socket,
        },
    };
});
