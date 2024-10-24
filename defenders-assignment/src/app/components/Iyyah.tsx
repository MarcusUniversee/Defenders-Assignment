import React from 'react';
import TextDisplay from './components/TextDisplay';
import './styles.css';

const Iyyah = () => {
  const sampleText = 'This is the sample text to annotate. Select it to add annotations.';

  return (
    <div className="app-container">
      <h1 className="header">Annotation Tool for Iyyah</h1>
      <TextDisplay text={sampleText} />
    </div>
  );
};

export default Iyyah;