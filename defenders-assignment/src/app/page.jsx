"use client"

import React, { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Textarea } from "../../components/ui/textarea"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Bold, Italic, Underline, LinkIcon, Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import PDFViewer from './components/PDFViewer'
import { processDocument } from './utils/documentProcessor'
import { getAIAnnotation } from './utils/pdfUtils'

export default function AnnotationTool() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfText, setPdfText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedText, setSelectedText] = useState('')
  const [annotations, setAnnotations] = useState([])
  const [definitions, setDefinitions] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(null)
  const [currentInput, setCurrentInput] = useState('')
  const [currentTerm, setCurrentTerm] = useState('')

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      setIsLoading(true)
      setError(null)
      setPdfFile(file)
      
      try {
        const base64String = await fileToBase64(file)
        const formattedText = await processDocument(base64String)
        setPdfText(formattedText)
      } catch (error) {
        console.error('Error:', error)
        setError('Failed to process the PDF. Please try another file.')
      } finally {
        setIsLoading(false)
      }
    } else {
      setError('Please upload a PDF file.')
    }
  }

  const handleTextSelection = (text, event) => {
    if (text) {
      setSelectedText(text)
      // Position popup near the mouse click
      const x = event.pageX
      const y = event.pageY
      setPopupPosition({ x, y })
      setShowPopup(true)
    } else {
      setShowPopup(false)
    }
  }

  const handleAnnotate = () => {
    setShowPopup(false)
    setCurrentInput('')
    setIsEditing({
      type: 'annotation',
      text: selectedText,
      isNew: true
    })
  }

  const handleDefine = () => {
    setShowPopup(false)
    setCurrentTerm(selectedText)
    setCurrentInput('')
    setIsEditing({
      type: 'definition',
      text: selectedText,
      isNew: true
    })
  }

  const saveAnnotation = () => {
    if (isEditing?.isNew) {
      setAnnotations([...annotations, {
        text: isEditing.text,
        content: currentInput,
        date: new Date(),
        type: 'annotation',
        isAISuggested: isEditing.isAISuggested
      }])
    } else {
      const newAnnotations = annotations.map((ann, idx) => 
        idx === isEditing.index ? { 
          ...ann, 
          content: currentInput,
          isAISuggested: isEditing.isAISuggested
        } : ann
      )
      setAnnotations(newAnnotations)
    }
    setIsEditing(null)
    setCurrentInput('')
  }

  const saveDefinition = () => {
    if (isEditing?.isNew) {
      setDefinitions([...definitions, {
        term: currentTerm,
        definition: currentInput,
        date: new Date(),
        type: 'definition'
      }])
    } else {
      const newDefinitions = definitions.map((def, idx) =>
        idx === isEditing.index ? { ...def, definition: currentInput } : def
      )
      setDefinitions(newDefinitions)
    }
    setIsEditing(null)
    setCurrentInput('')
    setCurrentTerm('')
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Nathan's SUPA AI Annotation Tool</h1>
      
      <div className="mb-4">
        <Input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      {isLoading && <p className="text-center">Loading PDF content...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {pdfText && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <ScrollArea className="h-[70vh]">
                <PDFViewer
                  file={pdfFile instanceof File ? URL.createObjectURL(pdfFile) : null}
                  documentStructure={pdfText}
                  onTextSelect={handleTextSelection}
                />
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="annotations" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="annotations">Annotations</TabsTrigger>
                  <TabsTrigger value="definitions">Definitions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="annotations">
                  <ScrollArea className="h-[60vh]">
                    {annotations.map((item, index) => (
                      <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-muted-foreground">
                            {format(item.date, 'MM/dd/yy')}
                          </p>
                          {item.isAISuggested && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              AI Suggested
                            </span>
                          )}
                        </div>
                        <p className="font-medium mt-1">"{item.text}"</p>
                        <p className="mt-2">{item.content}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsEditing({ 
                                type: item.type, 
                                index, 
                                text: item.text,
                                isNew: false,
                                isAISuggested: item.isAISuggested
                              });
                              setCurrentInput(item.content);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setAnnotations(annotations.filter((_, i) => i !== index));
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="definitions">
                  <ScrollArea className="h-[60vh]">
                    {definitions.map((item, index) => (
                      <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {format(item.date, 'MM/dd/yy')}
                        </p>
                        <p className="font-medium mt-1">Term: "{item.term}"</p>
                        <p className="mt-2">{item.definition}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsEditing({ 
                                type: item.type, 
                                index, 
                                text: item.term,
                                isNew: false 
                              });
                              setCurrentInput(item.definition);
                              setCurrentTerm(item.term);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDefinitions(definitions.filter((_, i) => i !== index));
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              {isEditing && (
                <div className="mt-4">
                  <div className="mb-2">
                    <p className="text-sm font-medium">Selected Text:</p>
                    <p className="italic mb-2">"{isEditing.type === 'definition' ? currentTerm : isEditing.text}"</p>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    {isEditing.isNew && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={async () => {
                          try {
                            setCurrentInput('Loading AI suggestion...');
                            const aiAnnotation = await getAIAnnotation(isEditing.text, pdfText);
                            setCurrentInput(aiAnnotation);
                            setIsEditing(prev => ({
                              ...prev,
                              isAISuggested: true
                            }));
                          } catch (error) {
                            console.error('Error getting AI suggestion:', error);
                            setCurrentInput('Failed to get AI suggestion. Please try again.');
                          }
                        }}
                      >
                        Get AI Suggestion
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder={isEditing.type === 'definition' ? "Enter definition" : "Enter annotation"}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => isEditing.type === 'definition' ? saveDefinition() : saveAnnotation()}
                    >
                      Save
                    </Button>
                    <Button variant="ghost" onClick={() => setIsEditing(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {showPopup && (
        <div
          className="fixed bg-white rounded-lg shadow-lg p-2 flex gap-2"
          style={{
            top: popupPosition.y + 10,
            left: popupPosition.x - 50,
            zIndex: 1000
          }}
        >
          <Button onClick={handleAnnotate} variant="secondary">
            Annotate
          </Button>
          <Button onClick={handleDefine} variant="secondary">
            Define
          </Button>
        </div>
      )}
    </div>
  )
}