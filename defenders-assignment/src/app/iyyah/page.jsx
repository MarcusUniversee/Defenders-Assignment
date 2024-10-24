import React from 'react';
import TextDisplay from './components/TextDisplay';
import './styles.css'

const App = () => {
  const sampleText = `
    Hello, I am a sample text block for highlighting and annotation. 
    Select a portion of this text to highlight and annotate!!
  `;

  return (
    <div className="app-container p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-2xl font-bold mb-6">header</h1>
        <TextDisplay />
      </div>
    </div>
  );
};

export default App;