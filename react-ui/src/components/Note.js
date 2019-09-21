import React from 'react'

 const Note = ({note, toggleImportance, removeNote}) => {
     const level = note.important ? 'make not important' : 'make important';
    return (
        <div>
            <li className = 'note'>
                {note.content}
                <button onClick = {() => toggleImportance()}>{level}</button>
                <button onClick = {() => removeNote()}>X</button> 
            </li>
        </div>
    )
}
export default Note;
