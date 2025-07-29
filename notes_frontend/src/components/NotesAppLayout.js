import React, { useState, useEffect } from "react";
import NotesSidebar from "./NotesSidebar";
import NoteMainPanel from "./NoteMainPanel";
import "./NotesAppLayout.css";

/**
 * Layout for Notes app, provides sidebar + main detail view. Pulls in all major screens.
 */
const mockInitialNotes = [
  {
    id: "1",
    title: "Welcome! 👋",
    content: "This is a sample note. Start taking notes!",
    created: Date.now(),
  },
  {
    id: "2",
    title: "Design System ✨",
    content: "Styles and layouts follow the Figma spec.",
    created: Date.now(),
  },
];

/**
 * PUBLIC_INTERFACE
 * NotesAppLayout component
 * Provides responsive layout (sidebar and main pane) for notes.
 * Loads/saves notes from localStorage (persistent) and passes props for CRUD actions.
 */
export default function NotesAppLayout() {
  // Persistent storage
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Load from localStorage on mount (persistent) as placeholder
  useEffect(() => {
    // Placeholder for backend integration: replace with API load
    const savedNotes = window.localStorage.getItem("notesData");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(mockInitialNotes);
      window.localStorage.setItem("notesData", JSON.stringify(mockInitialNotes));
    }
  }, []);

  // Save to localStorage on notes update
  useEffect(() => {
    window.localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  // Create a new note
  const createNote = () => {
    const note = {
      id: `${Date.now()}`,
      title: "Untitled Note",
      content: "",
      created: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setSelectedNoteId(note.id);
  };

  // Update a note
  const updateNote = (id, update) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...update, updated: Date.now() } : n
      )
    );
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedNoteId(null);
  };

  // Select note
  const selectNote = (id) => {
    setSelectedNoteId(id);
  };

  // Find selected note
  const selectedNote =
    notes.find((n) => n.id === selectedNoteId) || (notes.length > 0 ? notes[0] : null);

  // Main layout
  return (
    <div className="notes-app-layout flex-row">
      <NotesSidebar
        notes={notes}
        onSelect={selectNote}
        selectedId={selectedNote ? selectedNote.id : null}
        onCreateNote={createNote}
      />
      <NoteMainPanel
        note={selectedNote}
        onUpdate={updateNote}
        onDelete={deleteNote}
        isEmpty={!notes.length}
      />
    </div>
  );
}
