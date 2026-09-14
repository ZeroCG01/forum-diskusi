import api from '../../utils/api';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      await api.register({ name, email, password });
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
