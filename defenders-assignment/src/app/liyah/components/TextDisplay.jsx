"use client";

import React, { useState, useEffect } from 'react';
import '../styles.css'

//TODO: pass in a text prop
const TextDisplay = ({ text }) => {
  // State to store selected text
  const [selectedText, setSelectedText] = useState('');
  // State to store list of annotations
  const [annotations, setAnnotations] = useState([]);
  const [inputAnnotation, setInputAnnotation] = useState('');

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedStr = selection ? selection.toString() : '';
    if (selectedStr) {
      setSelectedText(selectedStr);
    }
  };

  // Function to add annotation for the selected text
  const addAnnotation = () => {
    if (selectedText && inputAnnotation) {
      setAnnotations([...annotations, {text: selectedText, note: inputAnnotation}]);
      setSelectedText('');
      setInputAnnotation('');
    }
  };

  //TODO: Log to the console whenever an annotation is added using useEffect()
  useEffect(() => {
    console.log('Annotations updated:', annotations);
  }, [annotations]); 

  return (
    <div className="text-display border p-4 rounded-lg shadow-lg bg-white">
      <p className="text-content" onMouseUp={handleTextSelection}> {text}</p>
    {selectedText && (
      <div className='mt-4'>
        <h4 className='text-sm font-semibold'>Selected Text:</h4>
        <p className='italic text-gray-700 mb-2'>{selectedText}</p>

        <textarea
        className='w-full p-2 border rounded-md'
        placeholder="Type your annotation here!"
        value={inputAnnotation}
        onChange={(e) => setInputAnnotation(e.target.value)}
        ></textarea>

        <button 
        onClick={addAnnotation}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Add Annotation
        </button>
      </div>
    )}
    
    <div className='mt-6'>
      <h4 className="text-lg font-semibold mb-2">Annotations:</h4>
      {annotations.length > 0 ? (
        <ul className="space-y-2">
          {annotations.map((annotation, index) => (
           <li key={index} className="p-2 bg-gray-100 rounded-md shadow">
            <p className="font-bold text-gray-900">"{annotation.text}"</p>
            <p className="text-gray-600">{annotation.note}</p>
           </li> 
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No annotations yet.</p>
      )}
    </div>
  </div>
  );
};

export default TextDisplay;
