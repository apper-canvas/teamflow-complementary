import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";

const TaskCard = ({ task, assignee, onClick, isDragging }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const isDueSoon = task.dueDate && new Date(task.dueDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && !isOverdue;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: isDragging ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        className={`p-4 cursor-pointer ${isDragging ? "shadow-lg" : ""}`}
        onClick={onClick}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium text-gray-900 flex-1 line-clamp-2">
              {task.title}
            </h4>
            {task.priority && (
              <Badge variant={task.priority} className="flex-shrink-0">
                {task.priority}
              </Badge>
            )}
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {assignee ? (
              <div className="flex items-center gap-2">
                <Avatar 
                  src={assignee.avatar} 
                  alt={assignee.name}
                  size="sm"
                />
                <span className="text-xs text-gray-600 font-medium">
                  {assignee.name.split(" ")[0]}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <ApperIcon name="User" className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">Unassigned</span>
              </div>
            )}

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-600" : isDueSoon ? "text-amber-600" : "text-gray-600"}`}>
                <ApperIcon name="Calendar" className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;