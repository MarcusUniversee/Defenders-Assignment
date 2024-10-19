"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css';

const TextDisplay = () => {
  const [selectedText, setSelectedText] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [highlightedText, setHighlightedText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString() : '';
    if (selectedStr) {
      setSelectedText(selectedStr);
      setHighlightedText(selectedStr); // Store the selected text to be highlighted in blue
    }
  };

  const addAnnotation = (annotation) => {
    const newAnnotation = {
      selectedText: selectedText,
      annotation: annotation
    };
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    setSelectedText(''); // Clear selected text after annotation
    setHighlightedText(''); // Clear highlight after annotation
  };

  const deleteAnnotation = (index) => {
    setAnnotations((prevAnnotations) =>
      prevAnnotations.filter((_, i) => i !== index)
    );
  };

  const editAnnotation = (index) => {
    const annotationToEdit = annotations[index];
    setEditingIndex(index);
    setEditingText(annotationToEdit.annotation);
    setSelectedText(annotationToEdit.selectedText);
  };

  const saveEdit = () => {
    const updatedAnnotations = [...annotations];
    updatedAnnotations[editingIndex] = {
      ...updatedAnnotations[editingIndex],
      annotation: editingText
    };
    setAnnotations(updatedAnnotations);
    setEditingIndex(null);
    setSelectedText('');
  };

  const getHighlightedText = () => {
    let modifiedText = 'Hello, I am a sample text block for highlighting and annotation. Select a portion of this text to highlight and annotate!!';

    // Highlight the currently selected text in blue
    if (highlightedText) {
      const blueHighlight = `<span class="highlight-blue">${highlightedText}</span>`;
      const regex = new RegExp(`(${highlightedText})`, 'g');
      modifiedText = modifiedText.replace(regex, blueHighlight);
    }

    // Apply yellow highlight for existing annotations
    annotations.forEach(({ selectedText }) => {
      const highlighted = `<mark>${selectedText}</mark>`;
      const regex = new RegExp(`(${selectedText})`, 'g');
      modifiedText = modifiedText.replace(regex, highlighted);
    });

    return modifiedText;
  };

  useEffect(() => {
    console.log('Updated Annotations:', annotations);
  }, [annotations]);

  return (
    <div className="app-container">
      <h1 className="text-center">Aaron's Cool Header!</h1>
      <h3 className="text-center">Welcome to the Cat-Themed Annotation Tool!</h3>
      <div className="text-display-container">
        {annotations.length > 0 && (
          <div className="annotations-list">
            <h3>Annotations</h3>
            <ul>
              {annotations.map((annotation, index) => (
                <li key={index} className="mb-2">
                  <strong>{annotation.selectedText}</strong>: {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="edit-input"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit(); // Save on Enter key press
                          }
                        }}
                      />
                      <button className="save-btn" onClick={saveEdit}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      {annotation.annotation}
                      <div className="annotation-actions mt-1">
                        <button className="edit-btn" onClick={() => editAnnotation(index)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => deleteAnnotation(index)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-display">
          <p
            className="text-content"
            onMouseUp={handleTextSelection}
            dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
          />
          {/* Annotation input field that appears after selecting text */}
          {selectedText && editingIndex === null && (
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
        </div>
      </div>

      <div className="footer">
        <p>🐱 Cat-Themed Fun, Powered by You! 🐱</p>
      </div>
    </div>
  );
};

export default TextDisplay;
