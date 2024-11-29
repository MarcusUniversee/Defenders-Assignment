// Toolbar.tsx
import React from "react";
import "./Toolbar.css";

interface ToolbarProps {
  selectedText: string,
  range: Range | null,
  setSelectedText: Function,
  setRange: Function,
  showColorPicker: boolean;
  setShowColorPicker: (state: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedText,
  range,
  setSelectedText,
  setRange,
  showColorPicker,
  setShowColorPicker,
}) => {
  const toggleStyle = (
    style: "bold" | "italic" | "underline" | "highlight" | "color",
    color?: string
  ) => {

    if (!selectedText || !range) return;
    const docFragment = range.extractContents();
    const newFragment = document.createDocumentFragment();
    docFragment.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Handle text nodes
        const span = document.createElement("span");
        span.textContent = node.textContent;
  
        if (node.parentElement && node.parentElement.tagName === "SPAN") {
          // Preserve existing styles
          span.style.cssText = node.parentElement.style.cssText;
  
          // Remove the specific style if it's already applied
          switch (style) {
            case "bold":
              span.style.fontWeight =
                span.style.fontWeight === "bold" ? "" : "bold";
              break;
            case "italic":
              span.style.fontStyle =
                span.style.fontStyle === "italic" ? "" : "italic";
              break;
            case "underline":
              span.style.textDecoration =
                span.style.textDecoration === "underline" ? "" : "underline";
              break;
            case "highlight":
              span.style.backgroundColor =
                span.style.backgroundColor === "yellow" ? "" : "yellow";
              break;
            case "color":
              if (color) {
                span.style.color = span.style.color === color ? "" : color;
              }
              break;
          }
  
          // If no styles remain, replace span with plain text
          if (!span.getAttribute("style") || span.style.cssText.trim() === "") {
            const textNode = document.createTextNode(span.textContent || "");
            newFragment.appendChild(textNode);
            return;
          }
        } else {
          // Apply the new style
          switch (style) {
            case "bold":
              span.style.fontWeight = "bold";
              break;
            case "italic":
              span.style.fontStyle = "italic";
              break;
            case "underline":
              span.style.textDecoration = "underline";
              break;
            case "highlight":
              span.style.backgroundColor = "yellow";
              break;
            case "color":
              if (color) span.style.color = color;
              break;
          }
        }
  
        newFragment.appendChild(span);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Handle existing styled elements
        const element = node as HTMLElement;
        const span = document.createElement("span");
        span.innerHTML = element.innerHTML;
        span.style.cssText = element.style.cssText;
  
        // Remove or toggle the specific style
        switch (style) {
          case "bold":
            span.style.fontWeight =
              span.style.fontWeight === "bold" ? "" : "bold";
            break;
          case "italic":
            span.style.fontStyle =
              span.style.fontStyle === "italic" ? "" : "italic";
            break;
          case "underline":
            span.style.textDecoration =
              span.style.textDecoration === "underline" ? "" : "underline";
            break;
          case "highlight":
            span.style.backgroundColor =
              span.style.backgroundColor === "yellow" ? "" : "yellow";
            break;
          case "color":
            if (color) {
              span.style.color = span.style.color === color ? "" : color;
            }
            break;
        }
  
        // If no styles remain, replace span with plain text
        if (!span.getAttribute("style") || span.style.cssText.trim() === "") {
          const textNode = document.createTextNode(span.textContent || "");
          newFragment.appendChild(textNode);
        } else {
          newFragment.appendChild(span);
        }
      }
    });

    range.insertNode(newFragment);
    window.getSelection()?.removeAllRanges();
    setRange(null);
    setSelectedText('');
  };
  const onBoldClick = () => toggleStyle("bold")
  const onItalicClick = () => toggleStyle("italic")
  const onUnderlineClick = () => toggleStyle("underline")
  const onHighlightClick = () => toggleStyle("highlight")
  const onColorClick = (color: string) => toggleStyle("color", color)
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