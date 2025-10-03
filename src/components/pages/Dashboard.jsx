import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProjectCard from "@/components/molecules/ProjectCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import projectService from "@/services/api/projectService";
import taskService from "@/services/api/taskService";
import teamMemberService from "@/services/api/teamMemberService";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [projectsData, tasksData, membersData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
        teamMemberService.getAll()
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
      setTeamMembers(membersData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (projects.length === 0) {
    return (
      <Empty 
        icon="FolderPlus"
        title="No projects yet"
        description="Create your first project to start organizing your team's work"
        actionLabel="Create Project"
      />
    );
  }

const getProjectTasks = (projectId) => {
    return tasks.filter(task => {
      const projectIdValue = task.project_id_c?.Id || task.project_id_c;
      return projectIdValue === projectId;
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => {
    const columnId = task.column_id_c?.Id || task.column_id_c;
    return columnId === 4 || columnId === 8 || columnId === 11 || columnId === 14;
  }).length;

  const highPriorityTasks = tasks.filter(task => task.priority_c === "high").length;
  const overdueTasks = tasks.filter(task => {
    return task.due_date_c && new Date(task.due_date_c) < new Date();
  }).length;

  const stats = [
    {
      icon: "FolderKanban",
      label: "Active Projects",
      value: projects.length,
      color: "from-primary-600 to-primary-700"
    },
    {
      icon: "CheckCircle2",
      label: "Completed Tasks",
      value: completedTasks,
      color: "from-green-600 to-green-700"
    },
    {
      icon: "AlertCircle",
      label: "High Priority",
      value: highPriorityTasks,
      color: "from-red-600 to-red-700"
    },
    {
      icon: "Clock",
      label: "Overdue Tasks",
      value: overdueTasks,
      color: "from-amber-600 to-amber-700"
    }
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of all your projects and team activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
          <div className="text-sm text-gray-600">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.Id}
              project={project}
              tasks={getProjectTasks(project.Id)}
              teamMembers={teamMembers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;