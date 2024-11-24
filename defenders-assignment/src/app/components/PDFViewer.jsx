"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "../../../components/ui/scroll-area"

export default function PDFViewer({ documentStructure, onTextSelect }) {
  const contentRef = useRef(null)
  const [selectedRange, setSelectedRange] = useState(null)

  const handleTextSelection = (e) => {
    const selection = window.getSelection()
    const selectedText = selection.toString().trim()
    
    if (selectedText) {
      // Get the range of the selection
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      
      // Calculate position relative to the viewport
      const x = e.clientX
      const y = rect.top + window.scrollY

      // Save the range for later use
      setSelectedRange(range)
      
      // Call the parent's callback with the selected text and event
      onTextSelect(selectedText, {
        pageX: x,
        pageY: y
      })
    }
  }

  // Clear selection when clicking outside the content
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        window.getSelection().removeAllRanges()
        setSelectedRange(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderContent = () => {
    if (typeof documentStructure === 'string') {
      return <p className="text-base text-gray-700 leading-relaxed">{documentStructure}</p>;
    }
    
    if (!documentStructure || !Array.isArray(documentStructure)) {
      return <p>No content to display</p>;
    }

    if (Array.isArray(documentStructure)) {
      return documentStructure.map((section, index) => {
        switch (section.type) {
          case 'title':
            return (
              <h1 key={index} className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">
                {section.content}
              </h1>
            )
          case 'heading':
            return (
              <h2 key={index} className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
                {section.content}
              </h2>
            )
          case 'subheading':
            return (
              <h3 key={index} className="text-xl font-medium text-gray-600 mt-4 mb-3">
                {section.content}
              </h3>
            )
          case 'list':
            return (
              <ul key={index} className="list-disc pl-8 space-y-2 my-4 text-gray-700">
                {section.items?.map((item, i) => (
                  <li key={`${index}-${i}`} className="hover:bg-gray-50 transition-colors duration-150">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'paragraph':
          case 'text':
          default:
            return (
              <p key={index} className="text-base text-gray-700 leading-relaxed mb-4">
                {section.content || section}
              </p>
            )
        }
      })
    }

    // Fallback for unexpected input
    return <p className="text-red-500">Invalid document structure</p>
  }

  return (
    <ScrollArea className="h-[600px]">
      <div 
        ref={contentRef}
        className="pdf-content p-8 bg-white rounded-lg shadow-lg"
        onMouseUp={handleTextSelection}
      >
        <div className="prose prose-lg max-w-none">
          {renderContent()}
        </div>
      </div>
    </ScrollArea>
  )
}