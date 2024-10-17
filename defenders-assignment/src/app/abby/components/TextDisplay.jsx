"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css';

//TODO: pass in a text prop
const TextDisplay = ({ text }) => {
  // State to store selected text
  const [selectedText, setSelectedText] = useState('');
  // State to store list of annotations
  const [annotations, setAnnotations] = useState([]);

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
  const addAnnotation = (annotation) => {
    // TODO: Add logic to save the annotation and update the annotations state
    if (selectedText) {
      setAnnotations([...annotations, selectedText]);
      setSelectedText('');
    }
  };

  //TODO: Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    if (annotations.length > 0) {
      console.log('New annotation added:', annotations[annotations.length - 1]);
    }
  }, [annotations]); //put reactive elements inside the bracket

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>
        TODO: display text
        {text}
      </p>

      {/* TODO: Functionality to add an annotation */}
      {selectedText && (
        <div className="mt-4">
          <p className="italic text-gray-600">
            Selected Text: "{selectedText}"
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => addAnnotation('Annotation for selected text')}
          >
            Add Annotation
          </button>
        </div>
      )}

      {/* TODO: show annotations */}
      {annotations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Annotations:</h3>
          <ul className="list-disc list-inside">
            {annotations.map((annotation, index) => (
              <li key={index} className="mb-1">
                <strong>Selected Text:</strong> {annotation.text} <br />
                <strong>Annotation:</strong> {annotation.annotation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextDisplay;


