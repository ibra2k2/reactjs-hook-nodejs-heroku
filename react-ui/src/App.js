import React, {useState, useEffect} from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from 'react-notifications-component';


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happen...');
  
  const notesToShow = showAll ? notes : notes.filter(notes => notes.important === false);

  const rows = () => notesToShow.map(note =>
    <Note 
     key = {note.id}
     note = {note}
     toggleImportance = {() => toggleImportanceOf(note.id)}
     removeNote = {() => removeNoteOf(note.id)}
    />
  );

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setNotes(response.data);
    })

  }, []);


  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important}
    noteService
    .update(id, changeNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data));
    })
    .catch(error => {
      setErrorMessage(
        `the note '${note.content}' was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data));
      setNewNote('');
    });
  }
  const handleNodeChange = (event) => {
    setNewNote(event.target.value);
  }
  const removeNoteOf = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    console.log('Deleted Note:', id);
    noteService
    .remove(id)
    // .then(response => {
      //setNotes(notes.filter(n => n.id !== id));
      // console.log('Remove Note id', id);
    // })
    
  } 



  return (
    <div className="App">
      <div>
        <div>
          <h1>Notes</h1>
          <Notification message = {errorMessage} />
          <button onClick = {() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
        </div>
      <ul>
        {rows()}
        {/* <button onClick = {(event) => removeNoteOf()}>X</button>  */}
      </ul>
      </div>
      <div>
      <form onSubmit = {addNote}>
        <input type = "text" required 
        value = {newNote}
        onChange = {handleNodeChange}
        />
        <button type = "submit">Save</button>
      </form>
      </div>
    </div>
  );
}

export default App;
