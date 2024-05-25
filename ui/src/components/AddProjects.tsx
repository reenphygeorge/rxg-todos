"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addProject } from "@/lib/project";

type AddProjectsProps = {
  project: ProjectData[];
  setProject: Dispatch<SetStateAction<ProjectData[]>>;
  email: string | null;
  setPopup: Dispatch<SetStateAction<boolean>>;
};

const AddProjects: FC<AddProjectsProps> = ({
  project,
  setProject,
  email,
  setPopup,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Input
        id="title"
        placeholder="Enter your title"
        className="col-span-2 h-8"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={async () => {
          if (!email) return;
          const newProject = await addProject(email, inputValue);
          newProject.success ? setProject([...project, newProject.data]) : "";
          setPopup(false);
        }}
      >
        Add
      </Button>
    </>
  );
};

export default AddProjects;
