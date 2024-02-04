// Box.tsx
import React from "react";
import "./Box.css"; // Import the CSS file for styling

interface BoxProps {
  color: string;
}

const Box: React.FC<BoxProps> = ({ color }) => {
  return <div className={`box ${color}`}></div>;
};

export default Box;
