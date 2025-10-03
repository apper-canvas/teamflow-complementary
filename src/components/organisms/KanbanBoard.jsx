import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import TaskCard from "@/components/molecules/TaskCard";
import QuickTaskForm from "@/components/molecules/QuickTaskForm";
import Button from "@/components/atoms/Button";

const KanbanBoard = ({ 
  columns = [], 
  tasks = [], 
  teamMembers = [],
  onTaskClick,
  onTaskMove,
  onTaskCreate
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

const handleDrop = (e, columnId) => {
    e.preventDefault();
    const draggedColumnId = draggedTask.column_id_c?.Id || draggedTask.column_id_c;
    if (draggedTask && draggedColumnId !== columnId) {
      onTaskMove(draggedTask.Id, columnId);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleQuickAdd = (columnId, taskData) => {
    onTaskCreate({
      ...taskData,
      columnId
    });
    setShowQuickAdd(null);
  };

const getColumnTasks = (columnId) => {
    return tasks.filter(task => {
      const taskColumnId = task.column_id_c?.Id || task.column_id_c;
      return taskColumnId === columnId;
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
      {columns.map((column) => {
        const columnTasks = getColumnTasks(column.Id);
        const isDropTarget = dragOverColumn === column.Id;

        return (
          <motion.div
            key={column.Id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-80"
          >
            <div
              className={`bg-gray-50 rounded-xl p-4 h-full transition-all duration-200 ${
                isDropTarget ? "ring-2 ring-primary-500 bg-primary-50" : ""
              }`}
              onDragOver={(e) => handleDragOver(e, column.Id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.Id)}
            >
<div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: column.color_c }}
                  />
                  <h3 className="font-semibold text-gray-900">
                    {column.title_c || column.Name}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    {columnTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowQuickAdd(column.Id)}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <ApperIcon name="Plus" className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {showQuickAdd === column.Id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3"
                    >
                      <QuickTaskForm
                        teamMembers={teamMembers}
                        onSubmit={(data) => handleQuickAdd(column.Id, data)}
                        onCancel={() => setShowQuickAdd(null)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

{columnTasks.map((task) => {
                  const assigneeIdValue = task.assignee_id_c?.Id || task.assignee_id_c;
                  const assignee = teamMembers.find(m => m.Id === assigneeIdValue);
                  return (
                    <div
                      key={task.Id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <TaskCard
                        task={task}
                        assignee={assignee}
                        onClick={() => onTaskClick(task)}
                        isDragging={draggedTask?.Id === task.Id}
                      />
                    </div>
                  );
                })}

                {columnTasks.length === 0 && !showQuickAdd && (
                  <div className="text-center py-8 text-gray-400">
                    <ApperIcon name="Inbox" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;