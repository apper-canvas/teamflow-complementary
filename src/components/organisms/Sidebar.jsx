import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ projects = [], isOpen, onClose }) => {
  const navItems = [
    { icon: "LayoutDashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "Users", label: "Team", path: "/team" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-gray-200 lg:bg-white">
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Projects
            </h3>
            <div className="space-y-1">
              {projects.map((project) => (
                <NavLink
                  key={project.Id}
                  to={`/project/${project.Id}`}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
style={{ backgroundColor: project.color_c }}
                  />
                  <span className="truncate">{project.name_c || project.Name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Trello" className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">TeamFlow</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-600"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Projects
                </h3>
                <div className="space-y-1">
                  {projects.map((project) => (
                    <NavLink
                      key={project.Id}
                      to={`/project/${project.Id}`}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-600"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <div 
className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: project.color_c }}
                      />
                      <span className="truncate">{project.name_c || project.Name}</span>
                      <span className="truncate">{project.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;