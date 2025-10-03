import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const QuickTaskForm = ({ onSubmit, onCancel, teamMembers = [] }) => {
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [priority, setPriority] = useState("medium");

  const assigneeOptions = [
    { value: "", label: "Select assignee..." },
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
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        assigneeId: assigneeId ? parseInt(assigneeId) : null,
        priority
      });
      setTitle("");
      setAssigneeId("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        autoFocus
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          options={assigneeOptions}
        />

        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={priorityOptions}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!title.trim()}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default QuickTaskForm;