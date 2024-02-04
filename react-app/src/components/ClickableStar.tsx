import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ClickableStarProps {
  id: string;
  label: string;
  position: { top: number; left: number };
  onClick: (id: string) => void;
}

const ClickableStar: React.FC<ClickableStarProps> = ({
  id,
  label,
  position,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const [msg2, setMsg2] = useState('');
  const [write, setWrite] = useState('Write');

  const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
    height: "30px",
    width: "30px",
    borderRadius: "100%",
    borderColor: "#FFFFFF",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    padding: 0,
    filter: "blur(10px)",
    mixBlendMode: "screen",
    transition: "filter 0.5s ease-in-out, box-shadow 0.3s ease-in-out", // Add transition for smooth effect
    cursor: isHovered && isActive ? "pointer" : "default", // Set cursor based on hover and active state
  });

  const handleHover = () => {
    setIsHovered(true);
    if (isActive) {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        filter: "blur(20px)",
        boxShadow:
          "0px 0px 40px 20px #ffffff, 0px 0px 70px 40px #ff00ff, 0px 0px 150px 80px #00ffff, 0px 0px 10px 5px rgba(255, 255, 255, 0.5)",
      }));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isActive) {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        filter: "blur(10px)",
        boxShadow:
          "0px 0px 32px 16px #ffffff, 0px 0px 0px 0px #ff00ff, 0px 0px 120px 64px #00ffff",
      }));
    }
  };

  const handleButtonClick = () => {
    if (isActive) {
      onClick(id);
      setShowMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  let navigate = useNavigate();
  const handleWriteJournal = () => {
    let path = "/journal";
    navigate(path);
  }

  useEffect(() => {
    fetch("http://localhost:4997/getDataMain")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setIsActive((prev) => !prev);
        setShowMessage(false);
      }

      if (event.key === "2") {
        setMsg('I see their point.');
      }
      if (event.key === "3") {
        setMsg2("I'm over it.");
        setWrite("Go Supernova");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [id, isActive, onClick]);

const chatLogStyle = {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column', // Change to column layout
    alignItems: 'center', // Center items horizontally
  };
const userMessageStyle = {
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
  padding: '8px',
  marginBottom: '10px',
  width: '400px', // Set a fixed width here
};

const topicStyle = {
  borderRadius: '5px',
  padding: '10px', // Increase the padding for more spacing
  marginBottom: '10px',
  width: '600px', // Set a fixed width here
  fontWeight: 'bold', // Make it bold
  fontSize: '20px',
};
const dateStyle= {
  borderRadius: '5px',
  marginBottom: '10px',
  width: '600px', // Set a fixed width here
  fontWeight: 'bold', // Make it bold
};


const lastUserMessageStyle = {
  ...userMessageStyle,
  backgroundColor: '#e5f2ff',
  fontWeight: 'bold',
};


  return (
    <div>
      <Button
        variant="primary"
        onClick={handleButtonClick}
        style={buttonStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        {label}
      </Button>

      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Modal.Title>Star{id}!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <div style={chatLogStyle}>
            <div style={topicStyle}>Topic name: Friends argument</div>
            <div style={dateStyle}>Date: 2/2 - 2/4</div>
            <div style={userMessageStyle}>Stage 1: I fought with friends.</div>
            <div style={userMessageStyle}>Stage 2: I'm not talking to them.</div>
            <div style={userMessageStyle}>Stage 3: {msg}</div>
            <div style={userMessageStyle}>Stage 4: {msg2}</div>
          </div>
        </Modal.Body>
      <Modal.Footer style={{ textAlign: 'center' }}>
        <Button variant="secondary" onClick={handleWriteJournal} style={{ margin: 'auto' }}>
          {write}
        </Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClickableStar;
