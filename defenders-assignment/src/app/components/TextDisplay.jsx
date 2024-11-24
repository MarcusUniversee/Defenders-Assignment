"use client";

import React, { useState, useEffect } from 'react';
import { getAIAnnotation } from '../utils/pdfUtils';
import '../styles.css'

const TextDisplay = ({ text }) => {
  const [selectedText, setSelectedText] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [annotationInput, setAnnotationInput] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString() : '';
    if (selectedStr) {
      setSelectedText(selectedStr);
    }
  };

  const addAnnotation = (annotation, isAI = false) => {
    if (selectedText && annotation) {
      setAnnotations([...annotations, { text: selectedText, annotation, isAI }]);
      setSelectedText('');
      setAnnotationInput('');
    }
  };

  const handleAIAnnotation = async () => {
    if (selectedText) {
      setIsLoadingAI(true);
      try {
        const aiAnnotation = await getAIAnnotation(selectedText, text);
        addAnnotation(aiAnnotation, true);
      } catch (error) {
        console.error('Error getting AI annotation:', error);
        alert('Failed to get AI annotation. Please try again.');
      } finally {
        setIsLoadingAI(false);
      }
    }
  };

  useEffect(() => {
    if (annotations.length > 0) {
      console.log('Annotation added:', annotations[annotations.length - 1]);
    }
  }, [annotations]);

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}>{text}</p>
  
      {selectedText && (
        <div className="annotation-input mt-4">
          <p>Annotate: "<em>{selectedText}</em>"</p>
          <input
            type="text"
            className="border p-2 rounded w-full mb-2"
            placeholder="Enter annotation"
            value={annotationInput}
            onChange={(e) => setAnnotationInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded mr-2"
            onClick={() => addAnnotation(annotationInput)}
          >
            Add Annotation
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleAIAnnotation}
            disabled={isLoadingAI}
          >
            {isLoadingAI ? 'Getting AI Annotation...' : 'Get AI Annotation'}
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
                {item.isAI && <span className="text-green-500 ml-2">(AI-generated)</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextDisplay;
