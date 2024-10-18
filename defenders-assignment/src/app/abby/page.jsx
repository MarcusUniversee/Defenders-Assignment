"use client";

// Import necessary React modules and components
import React, { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import './styles.css'

const App = () => {
  const sampleText = `
    Hello, I am a sample text block for highlighting and annotation.
    Select a portion of this text to highlight and annotate!!
  `;

  // State to hold the user input annotation text
  const [annotationInput, setAnnotationInput] = useState("");

  // Function to update the annotation input as the user types
  const handleInputChange = (e) => {
    setAnnotationInput(e.target.value);
  };

  // Function to clear the annotation input after it's used
  const clearAnnotationInput = () => {
    setAnnotationInput('');
  };

  return (
    <div className="app-container p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-2xl font-bold mb-6">Text Annotation Tool</h1>

        {/* Pass annotationInput and clearAnnotationInput to TextDisplay */}
        <TextDisplay
          text={sampleText}
          annotationInput={annotationInput}
          clearAnnotationInput={clearAnnotationInput}
        />

        {/* Input box for adding annotations */}
        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Add your annotation here..."
            value={annotationInput}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
