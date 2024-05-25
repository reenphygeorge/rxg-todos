import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TodoPage } from "@/components/TodoPage";
import { getProjectTitleById } from "@/lib/project";
import { getTodos } from "@/lib/todos";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type ProjectDetailsProps = {
  params: {
    projectId: string;
  };
};

const ProjectDetails = async ({ params }: ProjectDetailsProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/");

  const { data } = await getTodos(params.projectId);
  const title =
    data.length === 0
      ? await getProjectTitleById(params.projectId, user?.email)
      : data[0].projectTitle;

  return (
    <main className="bg-slate-50 h-screen">
      <section>
        <MaxWidthWrapper className="pb-24 pt-5 sm:pb-32 lg:pt-10 xl:pt-20 lg:pb-52">
          <TodoPage
            todoData={data}
            projectId={params.projectId}
            projectTitle={title}
          />
        </MaxWidthWrapper>
      </section>
    </main>
  );
};

export default ProjectDetails;
