import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateMarkdown = (data: MarkdownData): string => {
  const { projectTitle, completedTodos, totalTodos, pending, completed } = data;

  let markdownText = `## ${projectTitle}\n`;
  markdownText += `Summary: ${completedTodos} / ${totalTodos} completed.\n\n`;

  // Section 1: Pending Todos
  markdownText += `### Pending Todos\n`;
  if (pending.length > 0) {
    markdownText += pending.map((todo) => `- [ ] ${todo.title}\n`).join("");
  } else {
    markdownText += "- No pending todos.\n";
  }

  markdownText += "\n";

  // Section 2: Completed Todos
  markdownText += `### Completed Todos\n`;
  if (completed.length > 0) {
    markdownText += completed.map((todo) => `- [x] ${todo.title}\n`).join("");
  } else {
    markdownText += "- No completed todos.\n";
  }

  return markdownText;
};

export const summarizeTodos = (todos: TodoData[]): MarkdownTodoSummary => {
  let pending: { title: string }[] = [];
  let completed: { title: string }[] = [];

  todos.forEach((todo) => {
    if (todo.status === "PENDING") {
      pending.push({ title: todo.description });
    } else if (todo.status === "COMPLETED") {
      completed.push({ title: todo.description });
    }
  });

  return {
    completedTodos: completed.length,
    totalTodos: todos.length,
    pending,
    completed,
  };
};
