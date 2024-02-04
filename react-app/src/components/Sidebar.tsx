// Sidebar.tsx
import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  // Add any props you need for the sidebar
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const handleButtonClick = (buttonId: string) => {
    // Implement your button click logic here
    console.log(`Button ${buttonId} clicked`);
  };

  const chatName = "Henry";
  const chatHandle = "@henry";
  const stars = 5; // You can set the initial stars

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src="/logo2.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
      </div>
      {/* Chat Log Structure */}
      <div className="chat-log">
        {/* Chat messages */}
        <div className="message received">
          <p>Hi there!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message received">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message received">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        <div className="message sent">
          <p>Hello!</p>
        </div>
        {/* Add more chat messages as needed */}
      </div>
      {/* Profile info */}
      <div className="profile-info">
        <h3>{chatName}</h3>
        <p>{chatHandle}</p>
      </div>
      {/* Add more sidebar content as needed */}
    </div>
  );
};

export default Sidebar;
