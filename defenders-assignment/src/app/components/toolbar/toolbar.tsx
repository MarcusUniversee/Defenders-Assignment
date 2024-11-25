// Toolbar.tsx
import React from "react";
import "./Toolbar.css";

interface ToolbarProps {
  onBoldClick: () => void;
  onItalicClick: () => void;
  onUnderlineClick: () => void;
  onHighlightClick: () => void;
  onColorClick: (color: string) => void;
  showColorPicker: boolean;
  setShowColorPicker: (state: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBoldClick,
  onItalicClick,
  onUnderlineClick,
  onHighlightClick,
  onColorClick,
  showColorPicker,
  setShowColorPicker,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-item search-bar">
        <button className="search-btn">
          <span role="img" aria-label="search">
            🔍
          </span>
          Related terms
        </button>
      </div>
      <div className="toolbar-item formatting">
        <button className="toolbar-btn" onClick={onBoldClick} data-tooltip="Bold">
          B
        </button>
        <button
          className="toolbar-btn"
          onClick={onItalicClick}
          data-tooltip="Italic"
        >
          I
        </button>
        <button
          className="toolbar-btn"
          onClick={onUnderlineClick}
          data-tooltip="Underline"
        >
          U
        </button>
        <div
          className="toolbar-btn"
          onMouseEnter={() => setShowColorPicker(true)}
          onMouseLeave={() => setShowColorPicker(false)}
        >
          A
          {showColorPicker && (
            <div className="color-picker">
              <div
                className="color-swatch"
                style={{ backgroundColor: "black" }}
                onClick={() => onColorClick("black")}
              />
              <div
                className="color-swatch"
                style={{ backgroundColor: "red" }}
                onClick={() => onColorClick("red")}
              />
              <div
                className="color-swatch"
                style={{ backgroundColor: "green" }}
                onClick={() => onColorClick("green")}
              />
              <div
                className="color-swatch"
                style={{ backgroundColor: "blue" }}
                onClick={() => onColorClick("blue")}
              />
            </div>
          )}
        </div>
        <button
          className="toolbar-btn"
          onClick={onHighlightClick}
          data-tooltip="Highlight"
        >
          🖍️
        </button>
      </div>
      <div className="toolbar-item save">
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default Toolbar;