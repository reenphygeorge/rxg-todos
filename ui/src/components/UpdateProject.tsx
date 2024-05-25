"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { updateProject } from "@/lib/project";

type updateProjectProp = {
  id: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setPopup: Dispatch<SetStateAction<boolean>>;
};

export const UpdateProject: FC<updateProjectProp> = ({
  id,
  title,
  setTitle,
  setPopup,
}) => {
  const [inputValue, setInputValue] = useState(title);
  return (
    <>
      <Input
        id="title"
        defaultValue={title}
        className="col-span-2 h-8"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={async () => {
          const project = await updateProject(id, inputValue);
          project.success ? setTitle(inputValue) : "";
          setPopup(false);
        }}
      >
        Rename
      </Button>
    </>
  );
};
