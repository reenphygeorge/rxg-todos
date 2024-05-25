"use client";

import React, { FC, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Sparkle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { formatDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { ProjectButtonSet } from "./ProjectButtonSet";
import AddProjects from "./AddProjects";

type ProjectPageProps = {
  name: string | null;
  email: string | null;
  data: ProjectData[];
};

const ProjectPage: FC<ProjectPageProps> = ({ email, name, data }) => {
  const [addProjectPopup, setAddProjectPopup] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectData[]>(data);
  return (
    <>
      <div className="flex justify-between w-full">
        <h4 className="text-2xl font-bold">
          {name ? `${name.split("@")[0]}'s` : "Your"} Workspace
        </h4>
        <Popover open={addProjectPopup}>
          <PopoverTrigger asChild>
            <Button
              className={buttonVariants({
                size: "lg",
                className: "hidden sm:flex items-center gap-1",
              })}
              onClick={() => setAddProjectPopup(!addProjectPopup)}
            >
              Add Project
              <Sparkle className="ml-2 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">New Project</h4>
                <p className="text-sm text-muted-foreground">
                  Add new projects be more productive
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <AddProjects
                    email={email}
                    project={project}
                    setProject={setProject}
                    setPopup={setAddProjectPopup}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {project.length === 0 ? (
        <h2 className="text-md font-bold text-slate-600 mt-40 text-center">
          Start By creating new project!
        </h2>
      ) : (
        ""
      )}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.map(({ id, title, createdDate }) => (
          <Card
            className="w-72 shadow-md transition duration-300 transform scale-100 hover:scale-105"
            key={id}
          >
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{formatDate(createdDate)}</CardDescription>
                </div>
                <ProjectButtonSet
                  id={id}
                  project={project}
                  setProject={setProject}
                />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProjectPage;
