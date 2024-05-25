import LandingPage from "@/components/LandingPage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProjectPage from "@/components/ProjectPage";
import { getProjects } from "@/lib/project";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getProjects(user?.email);
  return (
    <main className="bg-slate-50 h-screen">
      <section>
        <MaxWidthWrapper className="pb-24 pt-5 sm:pb-32 lg:pt-10 xl:pt-20 lg:pb-52">
          <div></div>
          {user === null ? (
            <LandingPage />
          ) : (
            <ProjectPage
              email={user.email}
              data={data.data}
              name={user.given_name}
            />
          )}
        </MaxWidthWrapper>
      </section>
    </main>
  );
};

export default Home;
