async function getProjects(email?: string | null) {
  if (!email) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?email=${email}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  data.email = email;
  return data;
}

const getProjectTitleById = async (
  projectId: string,
  email?: string | null
) => {
  const { data } = await getProjects(email);
  const project = data.find((project: any) => project.id === projectId);
  return project.title;
};

const updateProject = async (id: string, title: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};

const addProject = async (email: string, title: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, title }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};

const deleteProject = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};

export {
  getProjects,
  updateProject,
  getProjectTitleById,
  addProject,
  deleteProject,
};
