export const STATUS = Object.freeze({ ACTIVE: "active", DONE: "done" });

export function createTask(title, now = new Date()) {
  const value = title.trim();
  if (!value) throw new Error("Task title is required");
  return { id: crypto.randomUUID(), title: value, status: STATUS.ACTIVE, createdAt: now.toISOString() };
}

export function updateTask(tasks, id, changes) {
  return tasks.map((task) => task.id === id ? { ...task, ...changes } : task);
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function filterTasks(tasks, { search = "", status = "all" } = {}) {
  const query = search.toLocaleLowerCase().trim();
  return tasks.filter((task) =>
    (status === "all" || task.status === status) &&
    task.title.toLocaleLowerCase().includes(query)
  );
}
