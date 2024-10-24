"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css';

const TextDisplay = () => {
  const text = 'This is a sample text block that you can highlight and annotate. Select a portion of this text to make notes or highlight important sections.';

  const [selectedText, setSelectedText] = useState('');
  const [annotations, setAnnotations] = useState([]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString() : '';
    if (selectedStr) {
      setSelectedText(selectedStr);
    }
  };

  const addAnnotation = (annotation) => {
    setAnnotations([...annotations, { text: selectedText, annotation }]);
    setSelectedText('');
  };

  useEffect(() => {
    console.log('New annotation added:', annotations);
  }, [annotations]);

  return (
    <div className="text-display">
      {}
      <p className="text-content" onMouseUp={handleTextSelection}>
        {text}
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
                e.target.value = '';
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
};

export default TextDisplay;