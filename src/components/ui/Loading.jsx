import React from "react";

const Loading = ({ type = "skeleton" }) => {
  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2 mb-4"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-full mb-3"></div>
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"></div>
              <div className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"></div>
              <div className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="border border-gray-100 rounded-lg p-4">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;