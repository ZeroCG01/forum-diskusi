import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import filterCategoryReducer from './filterCategory/reducer';
import loadingReducer from './loading/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    filterCategory: filterCategoryReducer,
    loading: loadingReducer,
  },
});

export default store;
