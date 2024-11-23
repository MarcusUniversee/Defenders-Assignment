import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getAIAnnotation(selectedText, documentStructure) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Convert the document structure to plain text
    const fullText = documentStructure.map(section => {
      if (section.type === 'list') {
        return section.items.join('\n');
      }
      return section.content;
    }).join('\n');

    console.log('Full text being sent to Gemini:', fullText);
    console.log('Selected text:', selectedText);

    const prompt = `Given the following text from a document:
    "${fullText}"
    
    Please provide a concise explanation or annotation for this highlighted portion:
    "${selectedText}"
    
    Consider the context of the entire document in your explanation.
    Keep your response under 200 words and focus on explaining the significance or meaning of the highlighted text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('Gemini response:', response.text());
    return response.text();
  } catch (error) {
    console.error('Error getting AI annotation:', error);
    return 'Failed to get AI annotation. Please try again.';
  }
}
