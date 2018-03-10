//@ts-check

/**
 *
 *
 * @param {string} [text='']
 * @returns {Action}
 */
const textFilter = (text = '') => {
  return {type: 'TEXT_FILTER', text};
};

/**
 *
 *
 * @param {string} [sortBy='']
 * @returns {Action}
 */
const sortBy = (sortBy = '') => {
  return {type: 'SET_SORT_BY', sortBy};
};

/**
 *
 *
 * @param {string} [sortOrder='']
 * @returns {Action}
 */
const sortOrder = (sortOrder = '') => {
  return {type: 'SET_SORT_ORDER', sortOrder};
};

export {textFilter, sortBy, sortOrder};