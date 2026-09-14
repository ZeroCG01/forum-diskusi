import api from '../../utils/api';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_UP_VOTE_THREAD: 'threads/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD: 'threads/toggleDownVote',
  TOGGLE_NEUTRAL_VOTE_THREAD: 'threads/toggleNeutralVote',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { error: false, thread };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }

    const thread = threads.find((item) => item.id === threadId);
    if (!thread) return;

    const isUpVoted = thread.upVotesBy.includes(authUser.id);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      // Optimistic neutral vote
      dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.neutralVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      // Optimistic up vote
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
        } else {
          dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }

    const thread = threads.find((item) => item.id === threadId);
    if (!thread) return;

    const isUpVoted = thread.upVotesBy.includes(authUser.id);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      // Optimistic neutral vote
      dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.neutralVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      // Optimistic down vote
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
        } else {
          dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
