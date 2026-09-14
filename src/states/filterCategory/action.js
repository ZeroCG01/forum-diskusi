const ActionType = {
  SET_FILTER_CATEGORY: 'filterCategory/set',
  CLEAR_FILTER_CATEGORY: 'filterCategory/clear',
};

function setFilterCategoryActionCreator(category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category,
    },
  };
}

function clearFilterCategoryActionCreator() {
  return {
    type: ActionType.CLEAR_FILTER_CATEGORY,
  };
}

export { ActionType, setFilterCategoryActionCreator, clearFilterCategoryActionCreator };
