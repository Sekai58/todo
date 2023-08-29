import React, { useEffect, useState } from "react";
import { ITodo } from "../types/todo";


const Todo: React.FC = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState<string>('');

  useEffect(() => {
    const storedData:ITodo[] = JSON.parse(localStorage.getItem("data")||"[]");
      setData(storedData);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem:ITodo = {
      id: data.length+1,
      title: todo,
      completed: false,
    };
    const updatedData = [...data, newItem];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    console.log(updatedData);
    setTodo('');
  };

  const handleDelete = (id: number,idx:number) => {
    console.log(idx)
    const filteredData = data.filter((item,indx) => indx !== idx);
    setData(filteredData);
    localStorage.setItem("data", JSON.stringify(filteredData));
    window.location.reload();
  };

  const handleChecked = (id: number,idx:number) => {
    const updatedData = data.map((item,indx) => {
      if (idx === indx) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  if (data) {
    return (
      <div className="bg-[#8b8b8b] w-full h-screen">
        <nav className="p-5">
          <h1 className="text-2xl font-bold">ToDoList</h1>
        </nav>
        <div className="p-1">
          <form
            className="p-5 mb-2 flex flex-col sm:flex-row sm:pl-12"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter title"
              value={todo}
              className=" mb-2 rounded-xl border border-solid p-1 w-full sm:w-2/3"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            ></input>
            <input
              type="submit"
              value="Add to List"
              className="mb-2 ml-2 bg-[#404650] text-white rounded-2xl p-2"
            ></input>
          </form>
          {data.map((item,idx) => {
            return (
              <div
                className=" pl-5 pr-5 sm:pl-10 sm:pr-10 flex text-left w-full justify-center"
                key={idx}
              >
                <input
                  type="checkbox"
                  className="p-2 bg-[#47484b]"
                  defaultChecked={item.completed}
                  onChange={()=>handleChecked(item.id,idx)}
                ></input>
                <div className="flex w-full">
                  <div className=" bg-[#47484b] text-white w-2/3 p-2 ml-5 mb-1 mr-2 text-left rounded-md">
                    {item.completed ? <del>{item.title}</del> : <p>{item.title}</p>}
                  </div>
                  <button
                    className="bg-[#7e2122] p-2 rounded-md bottom-1 mb-1"
                    onClick={() => handleDelete(item.id,idx)}
                  >
                    <span className="mr-1 ml-1">x</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Todo;
