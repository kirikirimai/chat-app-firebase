import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore"
import { auth, db } from '../firebase-config'
import "../styles/Chat.css"

const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMesssage] = useState("")
    const messageRef = collection(db, "messages")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const queryMessages = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })

            setMessages(messages)
        })

        return () => unsuscribe();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        })

        setNewMesssage("")

    }
    return (
        <div className="chat-app">
            <div className='header'>
                <h1>Welcom to:{room.toUpperCase()}</h1>
            </div>
            <div>
                {messages.map((message, idx) => (
                    <div className='message' key={message.id}>
                        <span className='user'>{message.user}</span>
                        {message.text}
                     
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className='new-message-form'>
                <input value={newMessage} onChange={(e) => setNewMesssage(e.target.value)} className='new-message-input' placeholder='type your message' />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    )
}

export default Chat