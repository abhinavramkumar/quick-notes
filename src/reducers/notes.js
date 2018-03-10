const defaultNotes = [];

const notesReducer = (state = defaultNotes, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return [...action.notes];

    case 'ADD_NOTE':
      return [
        ...state,
        action.note
      ];

    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.id);

    case 'EDIT_NOTE':
      let oldNote = state.filter(note => note.id === action.updatedNote.id);
      let notes = state.filter(note => note.id !== action.updatedNote.id);
      return [
        ...notes, {
          ...oldNote,
          ...action.updatedNote
        }
      ];

    default:
      return state;
  }
};

export default notesReducer;