import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import GraphComponent from "./GraphComponent"
import Sidebar from "./Sidebar"
import "./Main.css" // Import the CSS file for app-wide styling

function Main() {
    const [data, setData] = useState([{}]);
    // Calculate the center of the screen
    const centerX = window.innerWidth / 2 - 200
    const centerY = window.innerHeight / 2 + 20

    // Define button coordinates relative to the center
    const buttonCoordinates = {
        "button-1": { top: centerY - 100, left: centerX - 150 },
        "button-2": { top: centerY + 50, left: centerX },
        "button-3": { top: centerY - 150, left: centerX + 300 }, // left
        "button-4": { top: centerY - 200, left: centerX }
        // Add more buttons with coordinates as needed
    }

    const [buttonData, setButtonData] = useState({})

    useEffect(() => {
        fetch("http://localhost:4997/getDataMain").then(
          res => res.json()
        ).then(
          data => {
            setData(data)
            console.log(data)
          }
        )
      }, [])

      useEffect(() => {
        // Fetch button active data from the backend or set default values
        // Replace this with your actual backend API endpoint
        const fetchButtonData = async () => {
          try {
            const response = await fetch("/api/buttonData")
            const data = await response.json()
            setButtonData(data)
          } catch (error) {
            console.error("Error fetching button data:", error)
          }
        }
    
        fetchButtonData()
      }, [])
    
      const buttons = Object.entries(buttonCoordinates).map(([id, position]) => ({
        id,
        label: "",
        position,
        isActive: buttonData[id] || false // Set the initial active state
      }))
    
      const edges = [
        { from: "button-1", to: "button-2" },
        { from: "button-2", to: "button-3" },
        { from: "button-3", to: "button-1" }, // Closing the triangle
        { from: "button-1", to: "button-4" }
        // Add more edges as needed
      ]
  
    return (
        <div>
            <Sidebar />
            <GraphComponent buttons={buttons} edges={edges} />
            {/* <p className='app'>Main</p>
            <p className='app'><Link to="/journal">Journal!!</Link></p>
            {(typeof data[0].topic === 'undefined') ? (
                <p>{data[0].topic} bibibi</p>
            ): (
                <p>{data[8].topic} hihihi</p>
                // data.members.map((member, i) => (
                //     <p key={i}>{member}</p>
                // ))
            )} */}
        </div>
    )
}

export default Main