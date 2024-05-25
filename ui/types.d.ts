type ProjectData = {
  id: string;
  title: string;
  createdDate: string;
};

type TodoData = {
  id: string;
  projectTitle: string;
  description: string;
  status: string;
  createdDate: string;
  updatedDate: string;
};

type MarkdownTodo = {
  title: string;
};

type MarkdownTodoSummary = {
  completedTodos: number;
  totalTodos: number;
  pending: { title: string }[];
  completed: { title: string }[];
};

type MarkdownData = {
  projectTitle: string;
  completedTodos: number;
  totalTodos: number;
  pending: MarkdownTodo[];
  completed: MarkdownTodo[];
};
