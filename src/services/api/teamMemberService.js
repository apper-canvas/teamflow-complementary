const teamMemberService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "name_c" } },
          { "field": { "Name": "email_c" } },
          { "field": { "Name": "avatar_c" } },
          { "field": { "Name": "role_c" } }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "ASC" }]
      };

      const response = await apperClient.fetchRecords('team_member_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching team members:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "name_c" } },
          { "field": { "Name": "email_c" } },
          { "field": { "Name": "avatar_c" } },
          { "field": { "Name": "role_c" } }
        ]
      };

      const response = await apperClient.getRecordById('team_member_c', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching team member ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async create(member) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: member.name_c || member.Name,
          name_c: member.name_c,
          email_c: member.email_c,
          avatar_c: member.avatar_c,
          role_c: member.role_c
        }]
      };

      const response = await apperClient.createRecord('team_member_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create team member:`, failed);
          throw new Error(failed[0].message || "Failed to create team member");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating team member:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateData = {
        Id: parseInt(id)
      };

      if (data.name_c !== undefined) updateData.name_c = data.name_c;
      if (data.Name !== undefined) updateData.Name = data.Name;
      if (data.email_c !== undefined) updateData.email_c = data.email_c;
      if (data.avatar_c !== undefined) updateData.avatar_c = data.avatar_c;
      if (data.role_c !== undefined) updateData.role_c = data.role_c;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('team_member_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update team member:`, failed);
          throw new Error(failed[0].message || "Failed to update team member");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating team member:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('team_member_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete team member:`, failed);
          throw new Error(failed[0].message || "Failed to delete team member");
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting team member:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default teamMemberService;