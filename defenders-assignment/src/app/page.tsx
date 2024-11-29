'use client';
import React, { useState } from "react";
import "./styles.css";
import Toolbar from "./components/toolbar/toolbar";
//import logo from "./images/Defenders-of-Wildlife-square-logo_12.png"; // Importing the logo image
import Image from 'next/image';

export default function App() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [range, setRange] = useState<Range | null>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '' && selection.rangeCount > 0) {
      setSelectedText(selection.toString());
      setRange(selection.getRangeAt(0))
    }
  };
  
  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        {/*<Image src={logo} alt="Defenders of Wildlife Logo" className="App-logo" />*/}
        <h1>Full Name</h1>
      </header>

      {/* Main Content Section */}
      <main className="App-content">
        {/* Left Section */}
        <div className="App-left-section">
          <div className="App-buttons">
            <button className="App-upload-button">Upload File</button>
            <button className="App-publish-button">Publish Button</button>
          </div>
          <div className="App-toolbar">
            <div className="App">
              <Toolbar
                selectedText={selectedText}
                range={range}
                setSelectedText={setSelectedText}
                setRange={setRange}
                showColorPicker={showColorPicker}
                setShowColorPicker={setShowColorPicker}
              />
            </div>
          </div>
          <div className="App-pdf-viewer" onMouseUp={handleTextSelection}>
            <div
              className="center-text"
              contentEditable={true}
              suppressContentEditableWarning={true}
              style={{ 
                border: "1px solid #ccc", 
                padding: "10px", 
                minHeight: "100px",
                margin: "20px",
                borderRadius: "5px"
              }}
            >
              PDF viewer here
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="App-right-section">
          <div className="App-annotation-tool">Annotation tool here</div>
          <div className="App-glossary">Glossary here</div>
        </div>
      </main>
    </div>
  );
}