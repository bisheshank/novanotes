// App.tsx
import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import Sidebar from "./Sidebar";
import "./Main.css"; // Import the CSS file for app-wide styling

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [data, setData] = useState([{}]);
  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 - 200;
  const centerY = window.innerHeight / 2 + 20;

  // Define button coordinates relative to the center
  const buttonCoordinates: { [key: string]: { top: number; left: number } } = {
    "button-1": { top: centerY - 100, left: centerX - 250 },
    "button-2": { top: centerY + 150, left: centerX },
    "button-3": { top: centerY - 250, left: centerX + 300 }, // left
    "button-4": { top: centerY - 300, left: centerX },
    // Add more buttons with coordinates as needed
  };

  const [buttonData, setButtonData] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("http://localhost:4997/getDataMain")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // Fetch button active data from the backend or set default values
    // Replace this with your actual backend API endpoint
    const fetchButtonData = async () => {
      try {
        const response = await fetch("http://localhost:4997/getDataMain");
        const data = await response.json();
        setButtonData(data);
      } catch (error) {
        console.error("Error fetching button data:", error);
      }
    };

    fetchButtonData();
  }, []);

  const handleButtonClick = (id: string) => {
    console.log(`Button ${id} clicked`);
    // Implement your button click logic here
  };

  const buttons = Object.entries(buttonCoordinates).map(([id, position]) => ({
    id,
    label: "",
    position,
    isActive: buttonData[id] || false, // Set the initial active state
    onButtonClick: handleButtonClick,
  }));

  const edges = [
    { from: "button-1", to: "button-2" },
    { from: "button-2", to: "button-3" },
    { from: "button-3", to: "button-1" }, // Closing the triangle
    { from: "button-1", to: "button-4" },
    // Add more edges as needed
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <GraphComponent buttons={buttons} edges={edges} onButtonClick={handleButtonClick}/>
    </div>
  );
};

export default Main;
