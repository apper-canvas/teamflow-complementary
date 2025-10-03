const columnService = {
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
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "position_c" } },
          { "field": { "Name": "color_c" } },
          { "field": { "Name": "project_id_c" } }
        ],
        orderBy: [{ "fieldName": "position_c", "sorttype": "ASC" }]
      };

      const response = await apperClient.fetchRecords('column_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching columns:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async getByProjectId(projectId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "position_c" } },
          { "field": { "Name": "color_c" } },
          { "field": { "Name": "project_id_c" } }
        ],
        where: [
          {
            "FieldName": "project_id_c",
            "Operator": "EqualTo",
            "Values": [parseInt(projectId)]
          }
        ],
        orderBy: [{ "fieldName": "position_c", "sorttype": "ASC" }]
      };

      const response = await apperClient.fetchRecords('column_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching columns for project ${projectId}:`, error?.response?.data?.message || error.message);
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
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "position_c" } },
          { "field": { "Name": "color_c" } },
          { "field": { "Name": "project_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById('column_c', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching column ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async create(column) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: column.title_c || column.Name,
          title_c: column.title_c,
          position_c: parseInt(column.position_c),
          color_c: column.color_c,
          project_id_c: parseInt(column.project_id_c)
        }]
      };

      const response = await apperClient.createRecord('column_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create column:`, failed);
          throw new Error(failed[0].message || "Failed to create column");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating column:", error?.response?.data?.message || error.message);
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

      if (data.title_c !== undefined) updateData.title_c = data.title_c;
      if (data.Name !== undefined) updateData.Name = data.Name;
      if (data.position_c !== undefined) updateData.position_c = parseInt(data.position_c);
      if (data.color_c !== undefined) updateData.color_c = data.color_c;
      if (data.project_id_c !== undefined) updateData.project_id_c = parseInt(data.project_id_c);

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('column_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update column:`, failed);
          throw new Error(failed[0].message || "Failed to update column");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating column:", error?.response?.data?.message || error.message);
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

      const response = await apperClient.deleteRecord('column_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete column:`, failed);
          throw new Error(failed[0].message || "Failed to delete column");
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting column:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default columnService;