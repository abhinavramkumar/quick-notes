const ascendingSort = (a, b) => {
  if (a.createdAt > b.createdAt) {
    return 1;
  } else if (a.createdAt < b.createdAt) {
    return -1;
  } else {
    return 0;
  }
};

const descendingSort = (a, b) => {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
};

const sortedNotes = (notes, sortOrder, sortBy) => {
  if (sortBy === 'createdAt') {
    // eslint-disable-next-line
    return notes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return ascendingSort(a, b);
      } else if (sortOrder === 'desc') {
        return descendingSort(a, b);
      }
    });
  } else if (sortBy === 'updatedAt') {
    // eslint-disable-next-line
    return notes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return ascendingSort(a, b);
      } else if (sortOrder === 'desc') {
        return descendingSort(a, b);
      }
    });
  } else {
    return notes;
  }
};

const getSelectedNotes = (notes, filters) => {
  let filteredNotes = [];
  let isError = false;
  if (filters.text.length !== 0) {

    // Filtered Notes
    filteredNotes = notes.filter(note => {
      let regexp = new RegExp('', 'g');
      try {
        regexp = new RegExp("(" + (filters.text).toLowerCase() + ")", 'g');
        if (!regexp) {
          throw new Error("Invalid Search String!");
        }
      } catch (error) {
        console.log("Error: ", error.message);
        isError = true;
      }
      if (!isError) {
        const tags = note.tags
          ? note
            .tags
            .join(",")
          : '';

        return regexp.test((note.title).toLowerCase()) || regexp.test((note.description).toLowerCase()) || regexp.test(tags.toLowerCase())
          ? true
          : false;
      } else {
        return [];
      }
    });
    if (!isError) {
      return sortedNotes(filteredNotes, filters.sortOrder, filters.sortBy);
    } else {
      return [];
    }
  } else {
    return sortedNotes(notes, filters.sortOrder, filters.sortBy);
  }
};

export default getSelectedNotes;