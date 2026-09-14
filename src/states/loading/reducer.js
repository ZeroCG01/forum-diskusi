import { ActionType } from './action';

function loadingReducer(loading = 0, action = {}) {
  switch (action.type) {
  case ActionType.SHOW_LOADING:
    return loading + 1;
  case ActionType.HIDE_LOADING:
    return Math.max(0, loading - 1);
  default:
    return loading;
  }
}

export default loadingReducer;
