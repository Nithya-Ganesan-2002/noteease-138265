import React, { useState, useEffect } from "react";
import "./NoteMainPanel.css";

/**
 * PUBLIC_INTERFACE
 * NoteMainPanel - displays and edits a single note. Shows placeholder if no note.
 */
export default function NoteMainPanel({
  note,
  onUpdate,
  onDelete,
  isEmpty = false,
}) {
  // For edit state
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  // Save on edit
  const handleSave = () => {
    if (note) onUpdate(note.id, { title, content });
  };

  const handleDelete = () => {
    if (note && window.confirm("Delete this note?")) {
      onDelete(note.id);
    }
  };

  if (!note && isEmpty) {
    return (
      <div className="main-panel-empty">
        <div className="cover-title">noted</div>
        <div className="cover-subtitle">level up your note taking</div>
        <div className="cover-craftedby">
          crafted by <span className="cover-author">aakarshna</span>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="main-panel-placeholder">
        <h1>Select or create a note</h1>
      </div>
    );
  }

  return (
    <div className="note-main-panel">
      <input
        className="note-title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        placeholder="Title"
      />
      <textarea
        className="note-content-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleSave}
        rows={14}
        placeholder="Write your note here..."
      />
      <div className="note-actions">
        <button className="note-delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <span className="note-saved-label">Auto-saved</span>
      </div>
    </div>
  );
}
