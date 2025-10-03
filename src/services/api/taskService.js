const taskService = {
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
          { "field": { "Name": "project_id_c" } },
          { "field": { "Name": "column_id_c" } },
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "assignee_id_c" } },
          { "field": { "Name": "priority_c" } },
          { "field": { "Name": "due_date_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "DESC" }]
      };

      const response = await apperClient.fetchRecords('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
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
          { "field": { "Name": "project_id_c" } },
          { "field": { "Name": "column_id_c" } },
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "assignee_id_c" } },
          { "field": { "Name": "priority_c" } },
          { "field": { "Name": "due_date_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ],
        where: [
          {
            "FieldName": "project_id_c",
            "Operator": "EqualTo",
            "Values": [parseInt(projectId)]
          }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "DESC" }]
      };

      const response = await apperClient.fetchRecords('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching tasks for project ${projectId}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async getByColumnId(columnId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "project_id_c" } },
          { "field": { "Name": "column_id_c" } },
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "assignee_id_c" } },
          { "field": { "Name": "priority_c" } },
          { "field": { "Name": "due_date_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ],
        where: [
          {
            "FieldName": "column_id_c",
            "Operator": "EqualTo",
            "Values": [parseInt(columnId)]
          }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "DESC" }]
      };

      const response = await apperClient.fetchRecords('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching tasks for column ${columnId}:`, error?.response?.data?.message || error.message);
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
          { "field": { "Name": "project_id_c" } },
          { "field": { "Name": "column_id_c" } },
          { "field": { "Name": "title_c" } },
          { "field": { "Name": "description_c" } },
          { "field": { "Name": "assignee_id_c" } },
          { "field": { "Name": "priority_c" } },
          { "field": { "Name": "due_date_c" } },
          { "field": { "Name": "created_at_c" } },
          { "field": { "Name": "updated_at_c" } }
        ]
      };

      const response = await apperClient.getRecordById('task_c', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async create(task) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const recordData = {
        Name: task.title_c || task.Name,
        title_c: task.title_c,
        description_c: task.description_c || "",
        project_id_c: parseInt(task.project_id_c),
        column_id_c: parseInt(task.column_id_c)
      };

      if (task.assignee_id_c !== undefined && task.assignee_id_c !== null) {
        recordData.assignee_id_c = parseInt(task.assignee_id_c);
      }
      if (task.priority_c) {
        recordData.priority_c = task.priority_c;
      }
      if (task.due_date_c) {
        recordData.due_date_c = task.due_date_c;
      }

      const params = {
        records: [recordData]
      };

      const response = await apperClient.createRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create task:`, failed);
          throw new Error(failed[0].message || "Failed to create task");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error.message);
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
      if (data.description_c !== undefined) updateData.description_c = data.description_c;
      if (data.project_id_c !== undefined) updateData.project_id_c = parseInt(data.project_id_c);
      if (data.column_id_c !== undefined) updateData.column_id_c = parseInt(data.column_id_c);
      if (data.assignee_id_c !== undefined && data.assignee_id_c !== null) {
        updateData.assignee_id_c = parseInt(data.assignee_id_c);
      }
      if (data.priority_c !== undefined) updateData.priority_c = data.priority_c;
      if (data.due_date_c !== undefined) updateData.due_date_c = data.due_date_c;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update task:`, failed);
          throw new Error(failed[0].message || "Failed to update task");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error.message);
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

      const response = await apperClient.deleteRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete task:`, failed);
          throw new Error(failed[0].message || "Failed to delete task");
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async moveTask(taskId, newColumnId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(taskId),
          column_id_c: parseInt(newColumnId)
        }]
      };

      const response = await apperClient.updateRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to move task:`, failed);
          throw new Error(failed[0].message || "Failed to move task");
        }
        return response.results[0].data;
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error moving task:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default taskService;