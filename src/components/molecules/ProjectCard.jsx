import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";

const ProjectCard = ({ project, tasks = [], teamMembers = [] }) => {
  const navigate = useNavigate();

const completedTasks = tasks.filter(task => {
    const columnId = task.column_id_c?.Id || task.column_id_c;
    return columnId === 4 || columnId === 8 || columnId === 11 || columnId === 14;
  }).length;

  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

const assignedMembers = Array.from(new Set(tasks.map(t => {
    return t.assignee_id_c?.Id || t.assignee_id_c;
  })))
    .map(id => teamMembers.find(m => m.Id === id))
    .filter(Boolean)
    .slice(0, 3);

  const handleClick = () => {
    navigate(`/project/${project.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hover
        className="p-6 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color_c }}
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {project.name_c || project.Name}
            </h3>
          </div>
          <Badge variant="default">
            {totalTasks} tasks
          </Badge>
        </div>

<p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {project.description_c}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {assignedMembers.map((member) => (
<Avatar
                  key={member.Id}
                  src={member.avatar_c}
                  alt={member.name_c || member.Name}
                  src={member.avatar}
                  alt={member.name}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              {assignedMembers.length === 0 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {completedTasks}/{totalTasks} completed
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;