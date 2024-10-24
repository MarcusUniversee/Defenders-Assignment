import TextDisplay from "./components/TextDisplay";
import './styles.css'

const App = () => {
  const sampleText = `
    Hello, I am a sample text block for highlighting and annotation. 
    Select a portion of this text to highlight and annotate!!
  `;

  return (
    <div className="app-container p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-10xl">
      <h1 className="text-right text-4xl font-bold mb-6">𓃠
      </h1>
        <h1 className="text-center text-2xl font-bold mb-6">Meow!
        </h1>
          <TextDisplay text={sampleText}/>
      </div>
    </div>
  );
};

export default App;