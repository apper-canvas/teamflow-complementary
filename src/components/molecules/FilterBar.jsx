import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  teamMembers = [],
  onClearFilters 
}) => {
  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ];

const assigneeOptions = [
    { value: "", label: "All Team Members" },
    ...teamMembers.map(member => ({
      value: member.Id.toString(),
      label: member.name_c || member.Name
    }))
  ];

  const hasActiveFilters = filters.priority || filters.assigneeId;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ApperIcon name="Filter" className="w-4 h-4" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-1">
          <Select
            value={filters.priority || ""}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            options={priorityOptions}
            className="w-40"
          />

          <Select
            value={filters.assigneeId || ""}
            onChange={(e) => onFilterChange("assigneeId", e.target.value)}
            options={assigneeOptions}
            className="w-48"
          />

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearFilters}
            >
              <ApperIcon name="X" className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;