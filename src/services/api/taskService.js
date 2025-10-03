import tasksData from "../mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getByProjectId(projectId) {
    await delay(300);
    return tasks
      .filter(t => t.projectId === parseInt(projectId))
      .map(t => ({ ...t }));
  },

  async getByColumnId(columnId) {
    await delay(200);
    return tasks
      .filter(t => t.columnId === parseInt(columnId))
      .map(t => ({ ...t }));
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(task) {
    await delay(400);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      ...task,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, data) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks[index] = {
      ...tasks[index],
      ...data,
      Id: tasks[index].Id,
      updatedAt: new Date().toISOString()
    };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    return { success: true };
  },

  async moveTask(taskId, newColumnId) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(taskId));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks[index] = {
      ...tasks[index],
      columnId: parseInt(newColumnId),
      updatedAt: new Date().toISOString()
    };
    return { ...tasks[index] };
  }
};

export default taskService;