import React from "react";
import MessageBoard from "./components/MessageBoard";

export default function App() {
    return ( <
        div style = {
            { maxWidth: 800, margin: "auto", padding: 24 } } >
        <
        header style = {
            { textAlign: "center", marginBottom: 24 } } >
        <
        h1 > Butter Website🧈 < /h1> <
        p > Vite + React + Vercel + MongoDB < /p> <
        /header>

        <
        MessageBoard / >
        <
        /div>
    );
}