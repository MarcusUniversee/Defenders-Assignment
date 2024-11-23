import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function processDocument(base64PDF) {
  try {
    console.log('DocumentProcessor: Starting processing');
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    
    const prompt = `
      Please read this PDF document and transcribe its contents.
      Format your response using these markers:
      
      #TITLE# for document titles
      #HEADING# for major sections
      #SUBHEADING# for subsections
      #PARAGRAPH# for regular text
      #LIST_START# for beginning of lists
      #ITEM# for list items
      #LIST_END# for end of lists
      
      Maintain the document's structure and content exactly as written.
    `;

    // Create image part from base64 PDF
    const imagePart = {
      inlineData: {
        data: base64PDF.split(',')[1],
        mimeType: 'application/pdf'
      }
    };

    console.log('Sending to Gemini 1.5 Flash...');
    const result = await model.generateContent([prompt, imagePart]);
    console.log('Received response from Gemini');
    const response = await result.response;
    const rawText = response.text();
    console.log('Raw Gemini Response:', rawText);
    
    // Parse the text into structured content
    const parsedContent = parseMarkedText(rawText);
    console.log('Parsed Content:', parsedContent);
    
    return parsedContent; // Return the parsed content instead of raw text
  } catch (error) {
    console.error('DocumentProcessor Error:', error);
    throw error;
  }
}

// Helper function to parse the marked text into structured content
export function parseMarkedText(markedText) {
  if (!markedText) return [];
  
  const sections = [];
  const lines = markedText.split('\n');
  let inList = false;
  let currentListItems = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) return;

    if (trimmedLine.startsWith('#TITLE#')) {
      sections.push({
        type: 'title',
        content: trimmedLine.replace('#TITLE#', '').trim(),
        className: 'text-4xl font-bold text-gray-800 mb-8 border-b pb-4'
      });
    } else if (trimmedLine.startsWith('#HEADING#')) {
      sections.push({
        type: 'heading',
        content: trimmedLine.replace('#HEADING#', '').trim(),
        className: 'text-2xl font-semibold text-gray-700 mt-6 mb-4'
      });
    } else if (trimmedLine.startsWith('#SUBHEADING#')) {
      sections.push({
        type: 'subheading',
        content: trimmedLine.replace('#SUBHEADING#', '').trim(),
        className: 'text-xl font-medium text-gray-600 mt-4 mb-3'
      });
    } else if (trimmedLine.startsWith('#PARAGRAPH#')) {
      sections.push({
        type: 'paragraph',
        content: trimmedLine.replace('#PARAGRAPH#', '').trim(),
        className: 'text-base text-gray-700 leading-relaxed mb-4 indent-6'
      });
    } else if (trimmedLine.startsWith('#LIST_START#')) {
      inList = true;
      currentListItems = [];
    } else if (trimmedLine.startsWith('#LIST_END#')) {
      if (currentListItems.length > 0) {
        sections.push({
          type: 'list',
          items: [...currentListItems],
          className: 'list-disc pl-8 space-y-2 my-4 text-gray-700 ml-6'
        });
      }
      inList = false;
      currentListItems = [];
    } else if (trimmedLine.startsWith('#ITEM#')) {
      const content = trimmedLine.replace('#ITEM#', '').trim();
      if (inList) {
        currentListItems.push(content);
      }
    } else if (!inList) {
      sections.push({
        type: 'text',
        content: trimmedLine,
        className: 'text-base text-gray-700 mb-2'
      });
    }
  });

  return sections;
} 