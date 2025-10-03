import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ currentProject, onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const isProjectPage = location.pathname.startsWith("/project/");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="Trello" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TeamFlow
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isProjectPage && currentProject && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentProject.color }}
                />
                <span className="text-sm font-medium text-gray-900">
                  {currentProject.name}
                </span>
              </div>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ApperIcon name="LayoutDashboard" className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;