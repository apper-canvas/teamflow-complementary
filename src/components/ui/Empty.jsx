import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "Inbox", 
  title = "No items yet", 
  description = "Get started by creating your first item",
  actionLabel = "Create New",
  onAction 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {onAction && (
          <Button onClick={onAction} className="mx-auto">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;