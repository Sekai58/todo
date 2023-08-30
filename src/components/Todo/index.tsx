import React, { useEffect, useState } from "react";
import { ITodo } from "../types/todo";


const Todo: React.FC = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState<string>('');
  const query ='abcde'
  

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
      <div className="bg-[#f5f5f5] w-full min-h-screen">
        <div className="p-1 mt-16">
          <form
            className="p-5 mb-2 flex flex-col sm:flex-row sm:pl-12"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Add a task"
              value={todo}
              className=" mb-2 rounded-md  border-transparent focus:border-transparent focus:ring-0 py-3 px-3 w-full sm:w-2/3 shadow-[#575757] shadow-md"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            ></input>
            <input
              type="submit"
              value="Add"
              className="mb-2 ml-2 bg-gradient-to-r to-[#1A5265] from-[#1A5265] text-white rounded-xl px-3 shadow-[#3b3a3a] shadow-md hover:cursor-pointer"
            ></input>
          </form>
          
          {data.map((item,idx) => {
            return (
              <div
                className=" pl-5 pr-5 sm:pl-6 sm:pr-10 flex text-left w-full justify-center"
                key={idx}
              >
                <div className={`flex w-full ${item.title.includes(query)?"solid":"hidden"}`}>
                  <div className=" flex  justify-between items-center bg-white text-[#333333] shadow-[#5b5a5a] shadow-sm  p-3 mb-2 w-full sm:w-2/3 rounded-md ml-5 mr-2">
                  <div>
                  <input
                  type="checkbox"
                  className="h-4 w-4 rounded-full"
                  defaultChecked={item.completed}
                  onChange={()=>handleChecked(item.id,idx)}
                  ></input>
                    <span className="ml-3">{item.completed ? <del>{item.title}</del> : <>{item.title}</>}</span>
                  </div>
                    <button
                    className="bg-[#f84043] rounded-md shadow-[#5b5a5a] shadow-sm p-1"
                    onClick={() => handleDelete(item.id,idx)}
                  >
                    <span className="mr-1 ml-1 text-white">Delete</span>
                  </button>
                  </div>
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
