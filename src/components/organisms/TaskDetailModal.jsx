import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";

const TaskDetailModal = ({ 
  task, 
  teamMembers = [],
  onClose, 
  onUpdate,
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    assigneeId: task.assigneeId?.toString() || "",
    priority: task.priority,
    dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
  });

  const assignee = teamMembers.find(m => m.Id === task.assigneeId);

  const assigneeOptions = [
    { value: "", label: "Unassigned" },
    ...teamMembers.map(member => ({
      value: member.Id.toString(),
      label: member.name
    }))
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task.Id, {
      ...formData,
      assigneeId: formData.assigneeId ? parseInt(formData.assigneeId) : null,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.Id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-xl font-semibold"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                {isEditing ? (
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {task.description || "No description"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignee
                  </label>
                  {isEditing ? (
                    <Select
                      value={formData.assigneeId}
                      onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                      options={assigneeOptions}
                    />
                  ) : assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar src={assignee.avatar} alt={assignee.name} size="md" />
                      <div>
                        <div className="font-medium text-gray-900">{assignee.name}</div>
                        <div className="text-sm text-gray-500">{assignee.role}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Unassigned</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  {isEditing ? (
                    <Select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      options={priorityOptions}
                    />
                  ) : (
                    <Badge variant={task.priority} className="text-sm">
                      {task.priority}
                    </Badge>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  ) : task.dueDate ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>{format(new Date(task.dueDate), "MMMM d, yyyy")}</span>
                    </div>
                  ) : (
                    <p className="text-gray-500">No due date</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created
                  </label>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ApperIcon name="Clock" className="w-4 h-4" />
                    <span>{format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDelete}
                >
                  <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                  Delete Task
                </Button>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            title: task.title,
                            description: task.description,
                            assigneeId: task.assigneeId?.toString() || "",
                            priority: task.priority,
                            dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                      Edit Task
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TaskDetailModal;