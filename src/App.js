import { useRef, useState } from "react";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
    const inputRef = useRef();

    const add = () => {
      const value = inputRef.current.value;
      if (value) {
        const newData = { completed: false, value };
        setTasks([...tasks, newData]);
        inputRef.current.value = "";
      } else {
        alert("Please fill in required field!");
      }
    };

    const itemDone = (index) => {
      const newtask = [...tasks];
      newtask[index].completed = !newtask[index].completed;
      setTasks(newtask);
    };

    const toDelete = (index) => {
      const newtask = [...tasks];
      newtask.splice(index, 1);
      setTasks(newtask);
    };

    const startEditing = (index, value) => {
      setIsEditing(index);
      setEditValue(value);
    };

    const handleEditChange = (e) => {
      setEditValue(e.target.value);
    };

    const saveEdit = (index) => {
      const newtask = [...tasks];
      newtask[index].value = editValue;
      setTasks(newtask);
      setIsEditing(null);
      setEditValue("");
    };

  return (
      <div className="App">
        <h2>
          To <span>Do</span> List
        </h2>
        <input ref={inputRef} placeholder="Enter New Task..." />
        <ul>
          {tasks.map(({ value, completed }, index) => {
            return (
              <div className="task_list" key={index}>
                {isEditing === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button className="save-btn" onClick={() => saveEdit(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <li
                      key={index}
                      className={completed ? "diffStyle" : ""}
                      onClick={() => itemDone(index)}
                    >
                      {value}
                    </li>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(index, value)}
                    >
                      Edit
                    </button>
                  </>
                )}
                <span onClick={() => toDelete(index)}>X</span>
              </div>
            );
          })}
        </ul>
        <button className="btn" onClick={add}>
          Add
        </button>
      </div>
  );
}

export default App;
