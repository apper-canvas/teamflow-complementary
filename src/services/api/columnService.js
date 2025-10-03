import columnsData from "../mockData/columns.json";

let columns = [...columnsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const columnService = {
  async getAll() {
    await delay(200);
    return [...columns];
  },

  async getByProjectId(projectId) {
    await delay(200);
    return columns
      .filter(c => c.projectId === parseInt(projectId))
      .sort((a, b) => a.position - b.position)
      .map(c => ({ ...c }));
  },

  async getById(id) {
    await delay(200);
    const column = columns.find(c => c.Id === parseInt(id));
    if (!column) {
      throw new Error("Column not found");
    }
    return { ...column };
  },

  async create(column) {
    await delay(300);
    const maxId = columns.length > 0 ? Math.max(...columns.map(c => c.Id)) : 0;
    const newColumn = {
      ...column,
      Id: maxId + 1
    };
    columns.push(newColumn);
    return { ...newColumn };
  },

  async update(id, data) {
    await delay(200);
    const index = columns.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Column not found");
    }
    columns[index] = {
      ...columns[index],
      ...data,
      Id: columns[index].Id
    };
    return { ...columns[index] };
  },

  async delete(id) {
    await delay(300);
    const index = columns.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Column not found");
    }
    columns.splice(index, 1);
    return { success: true };
  }
};

export default columnService;