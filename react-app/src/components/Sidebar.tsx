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
          <p>Journal 1</p>
        </div>
        <div className="message sent">
          <p>Journal 2</p>
        </div>
        <div className="message received">
          <p>Friends argument</p>
        </div>
        <div className="message sent">
          <p>Journal 4</p>
        </div>
        <div className="message received">
          <p>Journal 5</p>
        </div>
        <div className="message sent">
          <p>Journal 6</p>
        </div>
        <div className="message sent">
          <p>Journal 7</p>
        </div>
        <div className="message sent">
          <p>Journal 8</p>
        </div>
        <div className="message sent">
          <p>Journal 9</p>
        </div>
        <div className="message sent">
          <p>Journal 10</p>
        </div>
        <div className="message sent">
          <p>Journal 11</p>
        </div>
        <div className="message sent">
          <p>Journal 12</p>
        </div>
        {/* Add more chat messages as needed */}
      </div>

    <div className="points-tab" style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px" }}>
      <img src="/logo1.png" alt="Points" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
      <span className="points-font" style={{ fontSize: "20px" }}>{stars}</span>
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
