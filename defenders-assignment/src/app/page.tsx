
import React from "react";
import "./styles.css";
//import logo from "./images/Defenders-of-Wildlife-square-logo_12.png"; // Importing the logo image
import Image from 'next/image';

export default function App() {
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
          <div className="App-toolbar">Toolbar here</div>
          <div className="App-pdf-viewer">PDF Viewer here</div>
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