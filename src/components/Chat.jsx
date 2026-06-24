import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket"
import { useSelector } from 'react-redux';
import axios from "axios";
import { BASE_URL } from '../utils/constants';

function Chat() {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const chatContainerRef = useRef(null);
    const bottomRef = useRef(null);

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            return {
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text: msg.text,
                time: msg.createdAt,
            };
        });
        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, [])

    useEffect(() => {
        if (!user) return;
        const socket = createSocketConnection();
        // As soon as the page loaded, the socket connection is made and joinChat event is emitted
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId, });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName + ": " + text);
            setMessages((messages) => [...messages, { firstName, lastName, text, time: new Date() }]);
        });

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (bottomRef.current) {
            try {
                bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            } catch (err) {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop =
                        chatContainerRef.current.scrollHeight;
                }
            }
        }
    }, [messages]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-3 text-2xl border-b border-gray-600">Chat</h1>
            {/* display message */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4"
                ref={chatContainerRef}>

                {messages.map((msg, index) => {
                    return (
                        <>
                            <div key={index} className={
                                "chat " +
                                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                            }>
                                <div className="chat-header">
                                    {`${msg.firstName} ${msg.lastName}`}
                                    <time className="text-xs opacity-50 ml-2">
                                        {msg.time && new Date(msg.time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </time>
                                </div>
                                {/* <div className="chat-bubble">{msg.text}</div> */}
                                <div className={
                                        user.firstName === msg.firstName
                                            ? "chat-bubble bg-purple-700 text-white"
                                            : "chat-bubble"
                                    }>
                                    {msg.text}
                                </div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </>
                    )
                })}
                <div ref={bottomRef}></div>
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none"></input>

                <button onClick={sendMessage}
                    className="bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat;





//display messages
{/* <div key={index} className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="profile"
                                            src={user.photoUrl}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.firstName}
                                    <time className="text-xs opacity-50 ml-2">
                                        {new Date(msg.time).toLocaleTimeString()}
                                    </time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                            <div key={index} className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            className="bg-white" alt="profile" src={user.photoUrl}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    You
                                    <time className="text-xs opacity-50 ml-2">
                                        {new Date(msg.time).toLocaleTimeString()}
                                    </time>

                                </div>
                                <div className="chat-bubble bg-indigo-500 text-white">
                                    {msg.text}
                                </div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div> */}