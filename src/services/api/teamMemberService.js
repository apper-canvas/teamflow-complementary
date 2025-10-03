import teamMembersData from "../mockData/teamMembers.json";

let teamMembers = [...teamMembersData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const teamMemberService = {
  async getAll() {
    await delay(200);
    return [...teamMembers];
  },

  async getById(id) {
    await delay(200);
    const member = teamMembers.find(m => m.Id === parseInt(id));
    if (!member) {
      throw new Error("Team member not found");
    }
    return { ...member };
  },

  async create(member) {
    await delay(300);
    const maxId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.Id)) : 0;
    const newMember = {
      ...member,
      Id: maxId + 1
    };
    teamMembers.push(newMember);
    return { ...newMember };
  },

  async update(id, data) {
    await delay(300);
    const index = teamMembers.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Team member not found");
    }
    teamMembers[index] = {
      ...teamMembers[index],
      ...data,
      Id: teamMembers[index].Id
    };
    return { ...teamMembers[index] };
  },

  async delete(id) {
    await delay(300);
    const index = teamMembers.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Team member not found");
    }
    teamMembers.splice(index, 1);
    return { success: true };
  }
};

export default teamMemberService;