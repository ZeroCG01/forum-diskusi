import api from '../../utils/api';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../authUser/action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_IS_PRELOAD: 'isPreload/set',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = api.getAccessToken();
      if (token) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      } else {
        dispatch(unsetAuthUserActionCreator());
      }
    } catch {
      dispatch(unsetAuthUserActionCreator());
      api.putAccessToken('');
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
