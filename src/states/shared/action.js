import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { asyncPopulateUsersAndThreads };
