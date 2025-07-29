import React from "react";
import "./NotesSidebar.css";

/**
 * PUBLIC_INTERFACE
 * NotesSidebar - shows list of notes and a New Note button.
 */
export default function NotesSidebar({
  notes,
  onSelect,
  selectedId,
  onCreateNote,
}) {
  return (
    <aside className="notes-sidebar">
      <div className="notes-sidebar-header">
        <span className="notes-sidebar-title">Notes</span>
        <button className="btn-newnote" onClick={onCreateNote}>
          + New
        </button>
      </div>
      <ul className="notes-list">
        {notes.length === 0 ? (
          <li className="notes-list-empty">No notes.</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className={
                "notes-list-item" +
                (selectedId === note.id ? " active" : "")
              }
              onClick={() => onSelect(note.id)}
            >
              <div className="notes-list-item-title">
                {note.title || "Untitled"}
              </div>
              <div className="notes-list-item-date">
                {note.created
                  ? new Date(note.created).toLocaleDateString()
                  : ""}
              </div>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
