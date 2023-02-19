import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatWindow() {
    const [chatMessages, addMessageToChat] = useState([]);
    const [message, setMessage] = useState("");
    const [isChatVisible, setChatVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    const startSendMessage = () => {
        addMessageToChat(chatMessages => [...chatMessages, messageBubble(message, "right")])
        setMessage("")
        setIsLoading(true)

        // Simulate a delay
        setTimeout(() => {
            sendMessage(message)
        }, 3000)
    }

    const sendMessage = (message) => {
        const api = "https://2ptgmvb0xk.execute-api.eu-west-1.amazonaws.com/prod/chat/"
        axios.get(api, {
            params: {
                message: message
            },
            timeout: 30000
        })
            .then((response) => addMessageToChat(chatMessages => [...chatMessages, messageBubble(response.data, "left")]))
            .then(() => setIsLoading(false))
            .catch((error) => {
                console.log(error)
                addMessageToChat(chatMessages => [...chatMessages, messageBubble("Sorry, I'm having trouble connecting to the server", "left")])
                setIsLoading(false)
            })
    }

    useEffect(() => {
        addMessageToChat(chatMessages => [...chatMessages, messageBubble("Hi, I'm BillyBot. I can answer questions about Pablo's CV", "left")])
        addMessageToChat(chatMessages => [...chatMessages, messageBubble("Try asking, what's Pablo's current role?", "left")])
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages])

    return (
        <div className="fixed bottom-24 right-2 z-40 xl:right-80 xl:bottom-6 text-right">
            <div className={`h-96 w-64 border border-2 rounded bg-white ${!isChatVisible ? "hidden" : ""}`}>
                <div className="h-[80%] relative overflow-auto pt-2">
                    {chatMessages.map((message) => <span className="flex" ref={messagesEndRef}>{message}</span>)}
                </div>
                <div className="h-[5%] text-left">
                    <p className={`text-sm text-gray-400 px-2 ${isLoading ? "visible" : "hidden"} `}>BillyBot is typing ...</p>
                </div>
                <div className="h-[15%] flex flex-row border-t">
                    <input type="text" className="w-[80%] px-2" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Message here ..." />
                    <div id="message-input" className="w-[20%]">
                        <button
                            className={`w-full h-full text-white ${isLoading || message == "" ? "bg-gray-400" : "bg-blue-400"}`}
                            disabled={isLoading || message == ""}
                            onClick={startSendMessage}
                        >
                            {isLoading ? spinner() : "Send"}
                        </button>
                    </div>
                </div>
            </div>
            <button
                className="rounded-full bg-white shadow-lg p-2 hover:bg-gray-100"
                onClick={() => setChatVisible(!isChatVisible)}
            >
                <img
                    className="w-12 md:w-22"
                    src="images/robot-head.png"
                    alt="Buy Me A Coffee"
                />
            </button>

        </div>
    )
}

// Helper Components
const messageBubble = (message, position = "right") => {
    return (
        <div className="container w-full">
            <div className={`max-w-[60%] rounded bg-blue-200 p-2 mb-4 mx-2 ${position == "right" ? "ml-auto" : ""}`}>
                <p className="text-gray-700 text-left">{message}</p>
            </div>
        </div>
    )
}

const spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    )
}
