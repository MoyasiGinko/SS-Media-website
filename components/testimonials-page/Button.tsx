import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "gradient" | "purple";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "gradient",
  className = "",
  onClick,
  type = "button",
}) => {
  const baseClasses =
    variant === "gradient" ? "gradient-button" : "purple-button";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
