import React from "react";
import ClickableStar from "./ClickableStar";

interface Edge {
  from: string;
  to: string;
}

interface Button {
  id: string;
  label: string;
  position: { top: number; left: number };
}

interface GraphComponentProps {
  buttons: Button[];
  edges: Edge[];
  onButtonClick: (id: string) => void;
}

const GraphComponent: React.FC<GraphComponentProps> = ({
  buttons,
  edges,
  onButtonClick,
}) => {
  const renderEdges = () => {
    return edges.map((edge, index) => {
      const fromButton = buttons.find((button) => button.id === edge.from);
      const toButton = buttons.find((button) => button.id === edge.to);

      if (fromButton && toButton) {
        const edgeStyle: React.CSSProperties = {
          stroke: "url(#gradient)",
          strokeWidth: 8,
          filter: "blur(5px)", // Add a slight blur for edge diffusion
        };

        return (
          <line
            key={index}
            x1={fromButton.position.left + 20} // Adjust these values based on button size
            y1={fromButton.position.top + 20}
            x2={toButton.position.left + 20} // Adjust these values based on button size
            y2={toButton.position.top + 20}
            style={edgeStyle}
          />
        );
      }

      return null;
    });
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      {buttons.map((button) => (
        <ClickableStar
          key={button.id}
          id={button.id}
          label={button.label}
          position={button.position}
          onClick={onButtonClick}
        />
      ))}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "white", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        {renderEdges()}
      </svg>
    </div>
  );
};

export default GraphComponent;
