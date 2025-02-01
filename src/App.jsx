import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from local storage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to local storage
  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Add or update note
  const handleSave = () => {
    if (newNote.trim() === "") return;

    let updatedNotes;
    if (editIndex !== null) {
      updatedNotes = notes.map((note, index) =>
        index === editIndex ? newNote : note
      );
      setEditIndex(null);
    } else {
      updatedNotes = [...notes, newNote];
    }

    setNotes(updatedNotes);
    setNewNote("");
    saveNotesToLocalStorage(updatedNotes);
  };

  // Edit note
  const handleEdit = (index) => {
    setNewNote(notes[index]);
    setEditIndex(index);
  };

  // Delete note
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  // Search notes
  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1> Notepad</h1>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <textarea
        rows="4"
        placeholder="Write your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      ></textarea>

<button className={editIndex !== null ? "edit" : "save"} onClick={handleSave}>
  {editIndex !== null ? "Update" : "Save"}
</button>


      <ul>
      {filteredNotes.map((note, index) => (
    <li key={index}>
      {note}
      <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
      <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default App;