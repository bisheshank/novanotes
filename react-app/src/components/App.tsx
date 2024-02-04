// App.tsx
import React, { useEffect, useState } from "react";
import GraphComponent from "./components/GraphComponent";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Import the CSS file for app-wide styling

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 - 200;
  const centerY = window.innerHeight / 2 + 20;

  // Define button coordinates relative to the center
  const buttonCoordinates: { [key: string]: { top: number; left: number } } = {
    "button-1": { top: centerY - 100, left: centerX - 150 },
    "button-2": { top: centerY + 50, left: centerX },
    "button-3": { top: centerY - 150, left: centerX + 300 }, // left
    "button-4": { top: centerY - 200, left: centerX },
    // Add more buttons with coordinates as needed
  };


  const [buttonData, setButtonData] = useState<{ [key: string]: boolean }>({});

  // Function to update button coordinates
  const updateButtonCoordinates = () => {
    setButtonCoordinates(prevCoordinates => ({
      ...prevCoordinates,
      "button-1": { top: centerY - 150, left: centerX - 150 },
      "button-2": { top: centerY + 150, left: centerX - 100 },
      "button-3": { top: centerY - 300, left: centerX + 150 },
      "button-4": { top: centerY, left: centerX - 200 },
    }));
  };

  useEffect(() => {
    // Fetch button active data from the backend or set default values
    // Replace this with your actual backend API endpoint
    const fetchButtonData = async () => {
      try {
        const response = await fetch("/api/buttonData");
        const data = await response.json();
        setButtonData(data);
      } catch (error) {
        console.error("Error fetching button data:", error);
      }
    };
    fetchButtonData();
  }, []);

  const buttons = Object.entries(buttonCoordinates).map(([id, position]) => ({
    id,
    label: "",
    position,
    isActive: buttonData[id] || false, // Set the initial active state
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
      <Sidebar onJournalClick={updateButtonCoordinates} /> 
      <GraphComponent buttons={buttons} edges={edges} />
    </div>
  );
};

export default App;
