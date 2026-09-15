/**
 * Skenario pengujian:
 *
 * - threadDetailReducer function
 *  - harus mengembalikan initial state ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan threadDetail ketika diberikan action RECEIVE_THREAD_DETAIL
 *  - harus mengembalikan null ketika diberikan action CLEAR_THREAD_DETAIL
 *  - harus menambahkan komentar baru ke array comments ketika diberikan action ADD_COMMENT
 *  - harus memperbarui upvote pada threadDetail ketika diberikan action TOGGLE_UP_VOTE_THREAD_DETAIL
 *  - harus memperbarui upvote pada komentar di threadDetail ketika diberikan action TOGGLE_UP_VOTE_COMMENT
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('harus mengembalikan initial state ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan threadDetail ketika diberikan action RECEIVE_THREAD_DETAIL', () => {
    // arrange
    const initialState = null;
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Satu',
      body: 'Isi thread satu',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(threadDetail);
  });

  it('harus mengembalikan null ketika diberikan action CLEAR_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('harus menambahkan komentar baru ke array comments ketika diberikan action ADD_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar satu',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const newComment = {
      id: 'comment-2',
      content: 'Komentar dua baru',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('harus memperbarui upvote pada threadDetail ketika diberikan action TOGGLE_UP_VOTE_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('harus memperbarui upvote pada komentar di threadDetail ketika diberikan action TOGGLE_UP_VOTE_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar satu',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});
