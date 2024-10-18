import React from "react";

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-theme-500 ${sizeClasses[size]}`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
