import { createTask, updateTask, removeTask, filterTasks, STATUS } from "./tasks.js";

const STORAGE_KEY = "taskboard-demo.tasks.v1";
const $ = (selector) => document.querySelector(selector);
const list = $("#task-list");
const form = $("#task-form");
const input = $("#task-title");
const search = $("#search");
const statusFilter = $("#status-filter");

function load() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

let tasks = load();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const visible = filterTasks(tasks, { search: search.value, status: statusFilter.value });
  list.replaceChildren();
  $("#count").textContent = `${tasks.filter((t) => t.status === STATUS.ACTIVE).length} active task(s)`;
  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks found.";
    list.append(empty);
    return;
  }

  for (const task of visible) {
    const item = document.createElement("li");
    item.className = "task";

    const done = document.createElement("input");
    done.type = "checkbox";
    done.checked = task.status === STATUS.DONE;
    done.setAttribute("aria-label", `Mark ${task.title} as complete`);
    done.addEventListener("change", () => {
      tasks = updateTask(tasks, task.id, { status: done.checked ? STATUS.DONE : STATUS.ACTIVE });
      save();
      render();
    });

    const title = document.createElement("span");
    title.textContent = task.title;
    if (task.status === STATUS.DONE) title.className = "completed";

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      const next = window.prompt("Edit task title:", task.title);
      if (next === null) return;
      const value = next.trim();
      if (!value) return;
      tasks = updateTask(tasks, task.id, { title: value });
      save();
      render();
    });

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.className = "danger";
    remove.addEventListener("click", () => {
      tasks = removeTask(tasks, task.id);
      save();
      render();
    });

    item.append(done, title, edit, remove);
    list.append(item);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    tasks = [...tasks, createTask(input.value)];
    input.value = "";
    save();
    render();
  } catch {
    input.focus();
  }
});
search.addEventListener("input", render);
statusFilter.addEventListener("change", render);
render();
