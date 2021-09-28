import React, { useEffect, useState } from "react";

const PruebaMensajes = ({ socket }) => {
    const [messages, setMessages] = useState();

    useEffect(() => {
        socket?.on("sendMessage", (data) => {
            if (data) {
                console.log(data);

                setMessages(data);
            }
        });
    }, [socket]);

    return <p>{messages}</p>;
};

export default PruebaMensajes;
