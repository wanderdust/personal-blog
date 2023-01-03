import { useEffect, useState } from "react";
import axios from "axios";


export default function ChatWindow() {
    const [chatMessages, addMessageToChat] = useState([]);
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = () => {
        const api = "https://r7wnaozg1c.execute-api.eu-west-1.amazonaws.com/prod/chat/"
        setIsLoading(true)

        axios.get(api, {
            params: {
                message: message
            }
        })
            .then((response) => addMessageToChat(response.json()))
            .then(() => setMessage(""))
            .then(() => setIsLoading(false))
            .catch((error) => console.log(error))
    }

    return (
        <div className="h-96 w-64 border">
            <div className="h-[80%] border">
                {chatMessages.map((message) => <p>{message}</p>)}
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
