"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addTodo } from "@/lib/todos";

type AddTodosProps = {
  todo: TodoData[];
  setTodo: Dispatch<SetStateAction<TodoData[]>>;
  projectId: string;
  setPopup: Dispatch<SetStateAction<boolean>>;
};

const AddTodos: FC<AddTodosProps> = ({
  todo,
  setTodo,
  projectId,
  setPopup,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Input
        id="title"
        placeholder="Enter your description"
        className="col-span-2 h-8"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={async () => {
          const newTodo = await addTodo(projectId, inputValue);
          newTodo.success ? setTodo([...todo, newTodo.data]) : "";
          setPopup(false);
        }}
      >
        Add
      </Button>
    </>
  );
};

export default AddTodos;
