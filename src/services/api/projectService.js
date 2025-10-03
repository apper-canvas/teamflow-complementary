const projectService = {
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
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "color_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "DESC" }]
      };

      const response = await apperClient.fetchRecords('project_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching projects:", error?.response?.data?.message || error.message);
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
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "color_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ]
      };

      const response = await apperClient.getRecordById('project_c', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async create(project) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: project.name_c || project.Name,
          name_c: project.name_c,
          description_c: project.description_c,
          color_c: project.color_c
        }]
      };

      const response = await apperClient.createRecord('project_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create project:`, failed);
          throw new Error(failed[0].message || "Failed to create project");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating project:", error?.response?.data?.message || error.message);
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
      if (data.description_c !== undefined) updateData.description_c = data.description_c;
      if (data.color_c !== undefined) updateData.color_c = data.color_c;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('project_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update project:`, failed);
          throw new Error(failed[0].message || "Failed to update project");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating project:", error?.response?.data?.message || error.message);
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

      const response = await apperClient.deleteRecord('project_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete project:`, failed);
          throw new Error(failed[0].message || "Failed to delete project");
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default projectService;