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
          "0px 0px 40px 20px #ffffff, 0px 0px 0px 0px #ff00ff, 0px 0px 150px 80px #00ffff",
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
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [id, isActive, onClick]);

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
        <Modal.Header closeButton>
          <Modal.Title>Star{id}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Topic name: Friends argument {/* {topic} */}
          <p></p>
          Date: 8/15 - 8/17
          {/* {date_range} */}
          <p></p>
          Stage 1: I fought with friends.
          <p></p>
          Stage 2: I'm not talking to them.
          <p></p>
          Stage 3: {msg}
          <p></p>
          Stage 4: {msg2}
          {/* {stage} */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWriteJournal}>
            Write
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClickableStar;
