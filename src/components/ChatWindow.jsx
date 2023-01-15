import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatWindow() {
    const [chatMessages, addMessageToChat] = useState([]);
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    const sendMessage = () => {
        const api = "https://2ptgmvb0xk.execute-api.eu-west-1.amazonaws.com/prod/chat/"
        addMessageToChat(chatMessages => [...chatMessages, messageBubble(message, "right")])
        setMessage("")
        setIsLoading(true)

        axios.get(api, {
            params: {
                message: message
            },
        })
            .then((response) => addMessageToChat(chatMessages => [...chatMessages, messageBubble(response.data, "left")]))
            .then(() => setIsLoading(false))
            .catch((error) => console.log(error))
    }

    const messageBubble = (message, position = "right") => {
        return (
            <div className="container w-full">
                <div className={`w-32 rounded bg-blue-200 p-2 mb-4 mx-2 ${position == "right" ? "ml-auto" : ""}`}>
                    <p className="text-gray-700">{message}</p>
                </div>
            </div>

        )

    }

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages])

    return (
        <div className="h-96 w-64 border">
            <div className="h-[80%] border relative overflow-auto">
                {chatMessages.map((message) => <span className="flex" ref={messagesEndRef}>{message}</span>)}
            </div>
            <div className="h-[20%] flex flex-row">
                <input type="text" className="w-[80%]" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Message here ..." />
                <div id="message-input" className="w-[20%]">
                    <button
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
