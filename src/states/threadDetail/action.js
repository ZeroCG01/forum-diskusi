import api from '../../utils/api';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'threadDetail/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'threadDetail/toggleDownVote',
  TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL: 'threadDetail/toggleNeutralVote',
  TOGGLE_UP_VOTE_COMMENT: 'threadDetail/toggleUpVoteComment',
  TOGGLE_DOWN_VOTE_COMMENT: 'threadDetail/toggleDownVoteComment',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'threadDetail/toggleNeutralVoteComment',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleNeutralVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.neutralVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      }
    } else {
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.upVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
        } else {
          dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id));
        }
      }
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.neutralVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      }
    } else {
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.downVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
        } else {
          dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id));
        }
      }
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const comment = threadDetail.comments.find((item) => item.id === commentId);
    if (!comment) return;

    const isUpVoted = comment.upVotesBy.includes(authUser.id);
    const isDownVoted = comment.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
        } else {
          dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus masuk terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const comment = threadDetail.comments.find((item) => item.id === commentId);
    if (!comment) return;

    const isUpVoted = comment.upVotesBy.includes(authUser.id);
    const isDownVoted = comment.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
        } else {
          dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
