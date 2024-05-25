"use client";

import { Pencil, Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { UpdateTodo } from "./UpdateTodo";
import { deleteTodo, updateTodo } from "@/lib/todos";

type TodoButtonSetProps = {
  id: string;
  todo: TodoData[];
  setTodo: Dispatch<SetStateAction<TodoData[]>>;
  currentDescription: string;
  currentStatus: string;
};

export const TodoButtonSet: FC<TodoButtonSetProps> = ({
  id,
  todo,
  setTodo,
  currentDescription,
  currentStatus,
}) => {
  const [updateTodoPopup, setUpdateTodoPopup] = useState<boolean>(false);

  return (
    <div className="flex justify-between gap-2">
      <Popover open={updateTodoPopup}>
        <PopoverTrigger asChild>
          <Pencil
            className="mt-2 ml-1.5 h-4 w-4 hover:text-green-600 cursor-pointer"
            onClick={() => setUpdateTodoPopup(!updateTodoPopup)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Update Todo</h4>
              <p className="text-sm text-muted-foreground">
                Update todos to better organize it
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 items-center gap-4">
                <UpdateTodo
                  id={id}
                  todo={todo}
                  setTodo={setTodo}
                  description={currentDescription}
                  status={currentStatus}
                  setPopup={setUpdateTodoPopup}
                />
                <Button
                  variant="outline"
                  onClick={async () => {
                    const updatedTodo = await updateTodo(
                      id,
                      currentDescription,
                      currentStatus === "PENDING" ? "COMPLETED" : "PENDING"
                    );
                    if (updatedTodo.success) {
                      const updatedTodoList = todo.map((t) =>
                        t.id === id ? updatedTodo.data : t
                      );
                      setTodo(updatedTodoList);
                      setUpdateTodoPopup(false);
                    }
                  }}
                >
                  Mark as{" "}
                  {currentStatus === "PENDING" ? "completed" : "pending"}
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Trash
        className="mt-2 ml-1.5 h-4 w-4 hover:text-red-600 cursor-pointer"
        onClick={async () => {
          const deletedTodo = await deleteTodo(id);
          if (deletedTodo.success) {
            const updatedTodoList = todo.filter((t) => t.id !== id);
            setTodo(updatedTodoList);
            setUpdateTodoPopup(false);
          }
        }}
      />
    </div>
  );
};
