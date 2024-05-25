async function getTodos(projectId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos?projectId=${projectId}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

const addTodo = async (projectId: string, description: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};

const updateTodo = async (id: string, description: string, status: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, description, status }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};

const deleteTodo = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos?id=${id}`,
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

export { getTodos, addTodo, updateTodo, deleteTodo };
