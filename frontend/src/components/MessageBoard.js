import React, { useEffect, useState } from "react";

function MessageBoard() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, []);

    const sendMessage = async(e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const res = await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input }),
        });

        const newMsg = await res.json();
        setMessages([newMsg, ...messages]);
        setInput("");
    };

    return ( <
        div style = {
            { padding: "20px" } } >
        <
        h2 > 💬Message Board < /h2> <
        form onSubmit = { sendMessage } >
        <
        input type = "text"
        value = { input }
        onChange = {
            (e) => setInput(e.target.value) }
        placeholder = "Type a message..." /
        >
        <
        button type = "submit" > Send < /button> <
        /form> <
        ul > {
            messages.map((msg) => ( <
                li key = { msg._id } > { msg.text } < /li>
            ))
        } <
        /ul> <
        /div>
    );
}

export default MessageBoard;