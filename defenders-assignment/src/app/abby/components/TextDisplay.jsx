"use client";

import React, { useState } from 'react';
import '../styles.css'

//TODO: pass in a text prop
const TextDisplay = () => {
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
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = (annotation) => {
    // TODO: Add logic to save the annotation and update the annotations state
  };

  //TODO: Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    //
  }, []); //put reactive elements inside the bracket

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>TODO: display text</p>

      TODO: Functionality to add an annotation
      

      TODO: show annotations

      
    </div>
  );
};

export default TextDisplay;
