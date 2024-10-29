"use client"
import React, { FC, useState } from "react";

interface CommentItem {
  highlightedText: string;
  comment: string;
}

export const AnnotationTool: FC<{ text: string }> = ({ text }) => {
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentItem[]>([]);

  function handleOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && highlightedText && comment) {
      setCommentList(prevList => [
        ...prevList,
        { highlightedText: truncateText(highlightedText), comment }
      ]);
      setHighlightedText("");
      setComment("");
    }
  }

  function handleHighlight() {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setHighlightedText(selection.toString());
    }
  }

  function truncateText(text: string) {
    if (text.length <= 30) return text;
    return text.substring(0, 15) + '...' + text.substring(text.length - 15);
  }

  const getHighlightedText = () => {
    const parts = text.split(new RegExp(`(${highlightedText})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightedText.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Text Annotation Tool</h1>
        <div className="mb-4 p-4 border rounded-lg" onMouseUp={handleHighlight}>
          <div className="whitespace-pre-wrap text-black">{getHighlightedText()}</div>
        </div>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded text-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleOnEnter}
          placeholder="Add your annotation"
        />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Annotations:</h2>
          {commentList.length === 0 ? (
            <div className="text-black">No annotations have been made yet.</div>
          ) : (
            commentList.map((item, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium text-blue-600">{item.highlightedText}</span><span className="text-black">: {item.comment}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}