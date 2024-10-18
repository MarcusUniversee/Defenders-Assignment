"use client";

import React, { useState, useEffect } from "react";
import '../styles.css';

// Pass annotationInput and clearAnnotationInput as props
const TextDisplay = ({ text, annotationInput, clearAnnotationInput }) => {
  // State to store selected text
  const [selectedText, setSelectedText] = useState("");
  // State to store list of annotations
  const [annotations, setAnnotations] = useState([]);

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString().trim() : "";
    if (selectedStr) {
      setSelectedText(selectedStr);
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = () => {
    if (selectedText && annotationInput) {
      const newAnnotation = {
        text: selectedText,
        annotation: annotationInput || "No annotation provided",
      };
      setAnnotations([...annotations, newAnnotation]);
      setSelectedText(""); // Clear selected text after adding annotation
      clearAnnotationInput(); // Clear the annotation input after it's used
    }
  };

  // Log to the console whenever an annotation is added
  useEffect(() => {
    if (annotations.length > 0) {
      console.log("New annotation added:", annotations[annotations.length - 1]);
    }
  }, [annotations]);

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>
        {text}
      </p>

      {/* Show selected text and allow adding an annotation */}
      {selectedText && (
        <div className="mt-4">
          <p className="italic text-gray-600">
            Selected Text: "{selectedText}"
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addAnnotation}
          >
            Add Annotation
          </button>
        </div>
      )}

      {/* Display list of annotations */}
      {annotations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Annotations Log:</h3>
          <ul className="list-disc list-inside">
            {annotations.map((annotation, index) => (
              <li key={index} className="mb-1">
                <strong>Highlighted Text:</strong> {annotation.text} <br />
                <i>    Annotation:</i> {annotation.annotation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TextDisplay;
