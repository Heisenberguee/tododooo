import { useState } from "react";
export default function Home() {
const [text,setText]= useState("")
function save() {
    localStorage.setItem ("state",text)
}
function get() {
    const state =  localStorage.getItem ("state")
    alert(state)
}
return <div>
    <input
        value={text}
        onChange={(e)=>setText(e.target.value)} 
    />
    <button onClick = {()=>save()}>保存</button>
    <button onClick = {()=>get()}>取得</button>
    </div>
}
