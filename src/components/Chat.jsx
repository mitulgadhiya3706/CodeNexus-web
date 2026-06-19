import React, { useState } from 'react'
import { useParams } from "react-router-dom";

function Chat() {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([{ text: "Hello World" }]);

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            {/* display message */}
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index) => {
                    return (
                        <>
                            <div key={index} className="chat chat-start">
                                <div className="chat-header">
                                    Mitul Gadhiya
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">2 hour ago</time>
                                </div>
                                <div className="chat-bubble">I loved you.</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none"></input>
                <button className="bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600">Send</button>
            </div>
        </div>
    )
}

export default Chat