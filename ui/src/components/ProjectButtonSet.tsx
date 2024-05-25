"use client";

import { deleteProject } from "@/lib/project";
import { CircleChevronRight, Trash } from "lucide-react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

type ProjectButtonSetProps = {
  id: string;
  project: ProjectData[];
  setProject: Dispatch<SetStateAction<ProjectData[]>>;
};

export const ProjectButtonSet: FC<ProjectButtonSetProps> = ({
  id,
  project,
  setProject,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <Trash
        className="mt-2 ml-1.5 h-4 w-4 hover:text-red-600 cursor-pointer"
        onClick={async () => {
          const deletedProject = await deleteProject(id);
          if (deletedProject.success) {
            const updatedProjectList = project.filter((p) => p.id !== id);
            setProject(updatedProjectList);
          }
        }}
      />
      <Link href={`/projects/${id}`}>
        <CircleChevronRight className="mt-2 ml-1.5 h-4 w-4 hover:text-green-600 cursor-pointer" />
      </Link>
    </div>
  );
};
