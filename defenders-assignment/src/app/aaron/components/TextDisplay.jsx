"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css';

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
      setSelectedText(selectedStr);
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = (annotation) => {
    const newAnnotation = {
      selectedText: selectedText,
      annotation: annotation
    };
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  };

  // Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    console.log('Updated Annotations:', annotations);
  }, [annotations]);

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>{text}</p>

      {selectedText && (
        <div className="annotation-input mt-4">
          <input
            type="text"
            placeholder={`Annotations: "${selectedText}"`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                addAnnotation(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      )}

      {annotations.length > 0 && (
        <div className="annotations-list mt-4">
          <h3>Annotations:</h3>
          <ul>
            {annotations.map((annotation, index) => (
              <li key={index}>
                <strong>{annotation.selectedText}</strong>: {annotation.annotation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextDisplay;
