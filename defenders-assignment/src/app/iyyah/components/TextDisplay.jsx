"use client";
import TextDisplay from '../components/TextDisplay';
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
      setSelectedText(selectedStr);
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = (annotation) => {
    // TODO: Add logic to save the annotation and update the annotations state
    setAnnotations([...annotations, { text: selectedText, annotation }]);
    setSelectedText('');
  };

  //TODO: Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    console.log('New annotation added: ', annotations);
    //
  }, [annotations]); //put reactive elements inside the bracket

  return (
    <div className="text-display">
      <p className="text-content" onMouseUp={handleTextSelection}>
        TODO: display text
      </p>
      {selectedText && (
        <div className="annotation-box">
          <p>Selected Text: {selectedText}</p>
          <input
            type="text"
            placeholder="Add your annotation"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addAnnotation(e.target.value);
                e.target.value = ''; // Clear input after submission
              }
            }}
          />
        </div>
      )}
      <div className="annotations-list">
        <h3>Annotations</h3>
        <ul>
          {annotations.map((item, index) => (
            <li key={index}>
              <strong>{item.text}</strong>: {item.annotation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

export default TextDisplay;
