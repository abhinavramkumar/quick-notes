const defaultFilters = {
  text: '',
  sortOrder: 'desc',
  sortBy: 'createdAt'
};

const filtersReducer = (state = defaultFilters, action) => {
  switch (action.type) {
    case 'TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.sortOrder
      };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy
      };

    default:
      return state;
  }
}

export default filtersReducer;