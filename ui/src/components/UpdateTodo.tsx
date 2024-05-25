"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { updateTodo } from "@/lib/todos";

type updateTodoProp = {
  id: string;
  description: string;
  status: string;
  todo: TodoData[];
  setTodo: Dispatch<SetStateAction<TodoData[]>>;
  setPopup: Dispatch<SetStateAction<boolean>>;
};

export const UpdateTodo: FC<updateTodoProp> = ({
  id,
  description,
  status,
  todo,
  setTodo,
  setPopup,
}) => {
  const [inputValue, setInputValue] = useState(description);
  return (
    <>
      <Input
        id="title"
        defaultValue={description}
        className="col-span-2 h-8"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={async () => {
          const updatedTodo = await updateTodo(id, inputValue, status);
          if (updatedTodo.success) {
            const updatedTodoList = todo.map((t) =>
              t.id === id ? updatedTodo.data : t
            );
            setTodo(updatedTodoList);
            setPopup(false);
          }
        }}
      >
        Rename
      </Button>
    </>
  );
};
