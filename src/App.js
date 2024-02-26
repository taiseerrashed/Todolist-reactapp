import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const add = () => {
    const value = inputRef.current.value;
    if(value){
      const newData = { completed: false, value };
      setTasks([...tasks, newData]);
      inputRef.current.value = "";
    }
    else{
      alert("Please fill in required field!")
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

  return (
    <div className="App">
      <h2>To <span>Do</span> List</h2>
      <input ref={inputRef} placeholder="Enter New Task..." />
      <ul>
        {
          tasks.map(({ value, completed }, index) => {
            return (
              <div className="task_list">
                <li key={index} className={completed ? "diffStyle" : ""} onClick={() => itemDone(index)}>{value}</li>
                <span onClick={() => toDelete(index)}>X</span>
              </div>
            );
          })
        }
      </ul>
      <button className="btn" onClick={add}>Add</button>
    </div>
  );
}

export default App;
