import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

const ClickableStar = ({ id, label, position, onClick }) => {
  const [isActive, setIsActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const [buttonStyle, setButtonStyle] = useState({
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
    height: "40px",
    width: "40px",
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
    cursor: isHovered && isActive ? "pointer" : "default" // Set cursor based on hover and active state
  })

  const handleHover = () => {
    setIsHovered(true)
    if (isActive) {
      setButtonStyle(prevStyle => ({
        ...prevStyle,
        filter: "blur(20px)",
        boxShadow:
          "0px 0px 40px 20px #ffffff, 0px 0px 70px 40px #ff00ff, 0px 0px 150px 80px #00ffff, 0px 0px 10px 5px rgba(255, 255, 255, 0.5)"
      }))
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (isActive) {
      setButtonStyle(prevStyle => ({
        ...prevStyle,
        filter: "blur(10px)",
        boxShadow:
          "0px 0px 40px 20px #ffffff, 0px 0px 0px 0px #ff00ff, 0px 0px 150px 80px #00ffff"
      }))
    }
  }

  const handleButtonClick = () => {
    if (isActive) {
      onClick(id)
      setShowMessage(true)
    }
  }

  const handleCloseMessage = () => {
    setShowMessage(false)
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "1") {
        setIsActive((prev) => !prev)
        setShowMessage(false)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [id, isActive, onClick])

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
          <Modal.Title>Star {id} Clicked!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Additional information or content can be placed here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ClickableStar
