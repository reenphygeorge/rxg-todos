"use client";

import { FileDown, Pencil, Sparkle } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FC, useState } from "react";
import { saveAs } from "file-saver";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn, formatDate, generateMarkdown, summarizeTodos } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { TodoButtonSet } from "./TodoButtonSet";
import { UpdateProject } from "./UpdateProject";
import AddTodos from "./AddTodos";

type TodoPageProps = {
  todoData: TodoData[];
  projectId: string;
  projectTitle: string;
};

export const TodoPage: FC<TodoPageProps> = ({
  projectId,
  todoData,
  projectTitle,
}) => {
  const [title, setTitle] = useState<string>(projectTitle);
  const [updateProjectPopup, setUpdateProjectPopup] = useState<boolean>(false);
  const [addTodoPopup, setAddTodoPopup] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoData[]>(todoData);

  const todoSummary = summarizeTodos(todo);
  const markdownText = generateMarkdown({
    projectTitle: title,
    ...todoSummary,
  });

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: "text/markdown" });
    saveAs(blob, `${title}.md`);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex justify-start gap-2">
          <h4 className="text-2xl font-bold">{title}</h4>
          <Popover open={updateProjectPopup}>
            <PopoverTrigger asChild>
              <Pencil
                className="mt-2 ml-1.5 h-4 w-4 hover:text-green-600 cursor-pointer"
                onClick={() => setUpdateProjectPopup(!updateProjectPopup)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Rename Project</h4>
                  <p className="text-sm text-muted-foreground">
                    Rename Project to better organize it
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <UpdateProject
                      id={projectId}
                      title={projectTitle}
                      setTitle={setTitle}
                      setPopup={setUpdateProjectPopup}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-5">
          <Popover open={addTodoPopup}>
            <PopoverTrigger asChild>
              <Button
                className={buttonVariants({
                  size: "lg",
                  className: "hidden sm:flex items-center gap-1",
                })}
                onClick={() => setAddTodoPopup(!addTodoPopup)}
              >
                Add Todo
                <Sparkle className="ml-2 h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">New Todo</h4>
                  <p className="text-sm text-muted-foreground">
                    Add new todo be more productive
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <AddTodos
                      projectId={projectId}
                      todo={todo}
                      setTodo={setTodo}
                      setPopup={setAddTodoPopup}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className={buttonVariants({
              size: "lg",
              className: "sm:flex items-center gap-1",
            })}
            onClick={handleDownload}
          >
            Export
            <FileDown className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
      {todo.length === 0 ? (
        <h2 className="text-md font-bold text-slate-600 mt-40 text-center">
          Start By creating new todo!
        </h2>
      ) : (
        ""
      )}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todo.map(({ id, description, status, createdDate, updatedDate }) => (
          <Card
            className="w-72 shadow-md transition duration-300 transform scale-100 hover:scale-105"
            key={id}
          >
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="leading-relaxed">
                    {description}
                  </CardTitle>
                  <CardDescription className="mt-5">
                    Created on: {formatDate(createdDate)}
                  </CardDescription>
                  <CardDescription>
                    Updated on: {formatDate(updatedDate)}
                  </CardDescription>
                  <div className="flex justify-between">
                    <Badge
                      variant="outline"
                      className={cn(
                        "mt-5",
                        status === "PENDING" && "border-yellow-600",
                        status === "COMPLETED" && "border-green-600"
                      )}
                    >
                      {status}
                    </Badge>
                    <div className="mt-3.5 mr-5">
                      <TodoButtonSet
                        id={id}
                        todo={todo}
                        setTodo={setTodo}
                        currentDescription={description}
                        currentStatus={status}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};
