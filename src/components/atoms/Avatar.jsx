import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ 
  src,
  alt = "Avatar",
  size = "md",
  className,
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base"
  };

  const initials = alt
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-white font-medium shadow-sm",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;