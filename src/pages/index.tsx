import { useEffect, useRef, useState } from "react";
import randomColor from "randomcolor";
import { IoTrashOutline } from "react-icons/io5";
import { setDefaultHighWaterMark } from "stream";
import { DatePicker } from 'rsuite';


type ToDo = {
  text: string;
  date: string;
  completed: boolean;
  color: string;
};

function diff(before: Date, after: string) {
  const Second = (new Date(after).getTime() - before.getTime()) / 1000
  if (Second <= 60 * 60 * 24) return "within 1 day"
  if (Second <= 60 * 60 * 24 * 30) return Math.floor(Second / 60 / 60 / 24) + "days later"
  if (Second <= 60 * 60 * 24 * 30 * 12) return Math.floor(Second / 60 / 60 / 24 / 30) + "months later"
  return Math.floor(Second / 60 / 60 / 24 / 30 / 12) + "years later"
}

export default function Home() {
  const [text, setText] = useState("");
  const todo: ToDo[] = [];
  const [list, setList] = useState(todo);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const Aim = useRef<HTMLInputElement>(null)

  useEffect(() => title ? localStorage.setItem("title", title) : undefined, [title])
  useEffect(() => setTitle(localStorage.getItem("title") || "My To Do List"), [])

  useEffect(() => get(), [])

  function add() {
    if (text === "") {
      alert("add something");
      return;
    }
    const newTodo: ToDo = {
      text: text,
      date: date.toISOString(),
      completed: false,
      color: randomColor({ luminosity: 'light' })
    };
    setList([...list, newTodo]);
    save()
    setModal(false)
    setText("");
    localStorage.setItem("state", JSON.stringify([...list, newTodo]))

  }

  function save() {
    localStorage.setItem("state", JSON.stringify(list));
  }

  function get() {
    const state = localStorage.getItem("state");
    if (!state) return;
    setList(JSON.parse(state));
  }

  function eliminate() {
    if (!confirm("are you sure you want to delete all?")) return
    setList([]);
    localStorage.clear();
  }

  function toggleComplete(index: number) {
    const newList = [...list];
    newList[index].completed = !newList[index].completed; // 完了状態を切り替え
    setList(newList);
  }

  return (
    <div>
      <h2 contentEditable={true}
        onBlur={(e) => setTitle(e.target.textContent || "")}>{title}</h2>
      <div className="AfD">  {list.map((t, index) => (
        <div className="Elon"
          onClick={() => toggleComplete(index)}
          key={index} style={{ backgroundColor: t.color }}>
          <div className="Date">{diff(new Date(), t.date)}</div>
          <span className="Meloni" style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.text}
          </span>



          <button className="Johnson" onClick={(e) => {
            e.stopPropagation()
            setList(list.filter((_, i) => i !== index))
            localStorage.setItem("state", JSON.stringify(list.filter((_, i) => i !== index)))
          }}><IoTrashOutline /></button>
        </div>
      ))}
        <div className="Add Elon" onClick={() => {
          setModal(!modal)
          setTimeout(() => Aim.current?.focus(), 1)
        }}>
          <span>+</span>

        </div>
      </div>
      {modal === true ? <div className="Layer"

        onClick={() => setModal(!modal)}


      ></div> : null}

      {modal === true ? <div className="Dialog">
        <DatePicker className="calendar"
          value={date}
          onChange={(e) => setDate(e || new Date())}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <input value={text}
            ref={Aim}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={add} className="add">add the due date and details</button>
        </form>
      </div> : null}

      <button className="allDelete" onClick={eliminate}>remove all items</button>


    </div>
  );
}