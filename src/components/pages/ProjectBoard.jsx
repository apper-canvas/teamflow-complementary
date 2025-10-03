import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import TaskDetailModal from "@/components/organisms/TaskDetailModal";
import FilterBar from "@/components/molecules/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import projectService from "@/services/api/projectService";
import columnService from "@/services/api/columnService";
import taskService from "@/services/api/taskService";
import teamMemberService from "@/services/api/teamMemberService";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    priority: "",
    assigneeId: ""
  });

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [projectData, columnsData, tasksData, membersData] = await Promise.all([
        projectService.getById(projectId),
        columnService.getByProjectId(projectId),
        taskService.getByProjectId(projectId),
        teamMemberService.getAll()
      ]);
      setProject(projectData);
      setColumns(columnsData);
      setTasks(tasksData);
      setTeamMembers(membersData);
    } catch (err) {
      setError(err.message || "Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

const handleTaskMove = async (taskId, newColumnId) => {
    const taskIndex = tasks.findIndex(t => t.Id === taskId);
    const oldColumnId = tasks[taskIndex].column_id_c;
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], column_id_c: newColumnId };
    setTasks(updatedTasks);

    try {
      await taskService.moveTask(taskId, newColumnId);
      toast.success("Task moved successfully");
    } catch (err) {
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], column_id_c: oldColumnId };
      setTasks(updatedTasks);
      toast.error("Failed to move task");
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        project_id_c: parseInt(projectId),
        description_c: ""
      });
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const handleTaskUpdate = async (taskId, data) => {
    try {
      const updatedTask = await taskService.update(taskId, data);
      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t));
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(tasks.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    setFilters({ priority: "", assigneeId: "" });
  };

const filteredTasks = tasks.filter(task => {
    if (filters.priority && task.priority_c !== filters.priority) return false;
    if (filters.assigneeId) {
      const assigneeIdValue = task.assignee_id_c?.Id || task.assignee_id_c;
      if (assigneeIdValue?.toString() !== filters.assigneeId) return false;
    }
    return true;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!project) return <Error message="Project not found" />;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div 
className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.color_c }}
              />
              <h1 className="text-3xl font-bold text-gray-900">
                {project.name_c || project.Name}
              </h1>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredTasks.length} tasks
            </span>
          </div>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        teamMembers={teamMembers}
        onClearFilters={handleClearFilters}
      />

      <div className="flex-1 overflow-x-auto p-6">
        {columns.length === 0 ? (
          <Empty
            icon="Columns"
            title="No columns yet"
            description="Create your first column to start organizing tasks"
          />
        ) : (
          <KanbanBoard
            columns={columns}
            tasks={filteredTasks}
            teamMembers={teamMembers}
            onTaskClick={setSelectedTask}
            onTaskMove={handleTaskMove}
            onTaskCreate={handleTaskCreate}
          />
        )}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          teamMembers={teamMembers}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
};

export default ProjectBoard;