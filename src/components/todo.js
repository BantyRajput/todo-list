import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("myTodolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [iseditItems, setIseditItems] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add items with fuction
  const addItems = () => {
    if (!inputData) {
      alert("plaese fill tha data");
    } else if (inputData && toggleButton){
      setItems(
        items.map((cureant) => {
          if(cureant.id === iseditItems) {
            return {...cureant , name:inputData}
          }
          return cureant;
        })
      );
      setInputData(([]));
    setIseditItems(null);
    setToggleButton(false);
    } 
    else {
      const addNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, addNewInputData]);
      setInputData("");
    }
  };

  // edit the  Itmes

  const editItem = (index) => {
    const item_todo_edited = items.find((cureant) => {
      return cureant.id === index;
    });
    setInputData(item_todo_edited.name);
    setIseditItems(index);
    setToggleButton(true);
  };
  // delete tha items

  const daleteItem = (index) => {
    const upDated = items.filter((cureant) => {
      return cureant.id !== index;
    });
    setItems(upDated);
  };

  const removedAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌ </figcaption>{" "}
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="from-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn " onClick={addItems}></i>
              ) : (
              <i className="fa fa-plus add-btn " onClick={addItems}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((cureant) => {
              return (
                <div className="eachItem" key={cureant.id}>
                  <h3>{cureant.name}</h3>
                  <div className="todo-btn ">
                    <i
                      className="far fa-edit add-btn "
                      onClick={() => {
                        editItem(cureant.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn "
                      onClick={() => daleteItem(cureant.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removedAll}
            >
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
