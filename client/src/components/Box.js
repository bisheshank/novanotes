// Box.tsx
import React from "react"
import "./Box.css" // Import the CSS file for styling

const Box = ({ color }) => {
  return <div className={`box ${color}`}></div>
}

export default Box