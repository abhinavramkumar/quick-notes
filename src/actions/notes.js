//@ts-check
import {database} from '../firebase/firebase';
const addNote = (note) => ({type: 'ADD_NOTE', note});
/**
 *
 *
 * @param {any} [note={}]
 * @returns
 */
const start__addNote = (note = {}) => {
  return dispatch => {
    console.log("Start ADD_NOTE...");
    database
      .ref('notes')
      .push({
        ...note
      });
    let id = '';
    database
      .ref('notes')
      .on('child_added', snapShot => {
        id = snapShot.key;
      });
    dispatch(addNote({
      ...note,
      id
    }));
  };
};

/**
 *
 *
 * @param {string} id
 */
const removeNote = (id) => ({type: 'REMOVE_NOTE', id});
/**
 *
 *
 * @param {string} id
 * @returns
 */
const start__removeNote = (id) => {
  return dispatch => {
    console.log("Start REMOVE_NOTE...");
    database
      .ref(`notes/${id}`)
      .remove()
      .then(() => {
        dispatch(removeNote(id));
        console.log("Note Removed...");
      })
      .catch(error => {
        console.log("Error Deleting Note : ", error);
      });
  };
};

/**
 *
 *
 * @param {any} updatedNote
 */
const editNote = (updatedNote) => ({type: 'EDIT_NOTE', updatedNote});
/**
 *
 *
 * @param {any} updatedNote
 * @returns
 */
const start__editNote = (updatedNote) => {
  return dispatch => {
    console.log("Start EDIT_NOTE");
    database
      .ref(`notes/${updatedNote.id}`)
      .update({
        ...updatedNote
      });

    dispatch(editNote(updatedNote));
  };
}

/**
 *
 *
 * @param {any} notes
 */
const getNotes = (notes) => ({type: 'GET_NOTES', notes});
/**
 *
 *
 * @param {any} notes
 * @returns
 */
const start__getNotes = (notes) => {
  return dispatch => {
    console.log("Start GET_NOTES...");
    dispatch(getNotes(notes));
  };
};

export {
  addNote,
  removeNote,
  editNote,
  getNotes,
  start__addNote,
  start__removeNote,
  start__editNote,
  start__getNotes
};