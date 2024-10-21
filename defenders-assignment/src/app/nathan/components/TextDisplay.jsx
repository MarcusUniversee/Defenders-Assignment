"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css'

//TODO: pass in a text prop
const TextDisplay = ({ text }) => {
  // State to store selected text
  const [selectedText, setSelectedText] = useState('');
  // State to store list of annotations
  const [annotations, setAnnotations] = useState([]);
  // State to store annotation input
  const [annotationInput, setAnnotationInput] = useState('');

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString() : '';
    if (selectedStr) {
      //TODO: change the state after selecting (highlighting)
      setSelectedText(selectedStr);
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = () => {
    if (selectedText && annotationInput) {
      // TODO: Add logic to save the annotation and update the annotations state
      setAnnotations([...annotations, { text: selectedText, annotation: annotationInput }]);
      setSelectedText(''); // Reset the selected text
      setAnnotationInput(''); // Clear the annotation input field
    }
  };

  //TODO: Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    if (annotations.length > 0) {
      console.log('Annotation added:', annotations[annotations.length - 1]);
    }
  }, [annotations]); // Run this effect whenever 'annotations' changes

  //put reactive elements inside the bracket
  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>{text}</p>
  
      {selectedText && (
        <div className="annotation-input mt-4">
          <p>Annotate: "<em>{selectedText}</em>"</p>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter annotation"
            value={annotationInput}
            onChange={(e) => setAnnotationInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={addAnnotation}
          >
            Add Annotation
          </button>
        </div>
      )}
  
      {annotations.length > 0 && (
        <div className="annotations-list mt-6">
          <h2 className="text-xl font-bold mb-2">Annotations:</h2>
          <ul>
            {annotations.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>"{item.text}"</strong>: {item.annotation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextDisplay;
