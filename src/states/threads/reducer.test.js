/**
 * Skenario pengujian:
 *
 * - threadsReducer function
 *  - harus mengembalikan initial state ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan daftar threads ketika diberikan action RECEIVE_THREADS
 *  - harus menambahkan thread baru di awal array ketika diberikan action ADD_THREAD
 *  - harus menambahkan userId ke upVotesBy dan menghapusnya dari downVotesBy ketika diberikan action TOGGLE_UP_VOTE_THREAD
 *  - harus menambahkan userId ke downVotesBy dan menghapusnya dari upVotesBy ketika diberikan action TOGGLE_DOWN_VOTE_THREAD
 *  - harus menghapus userId dari upVotesBy dan downVotesBy ketika diberikan action TOGGLE_NEUTRAL_VOTE_THREAD
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('harus mengembalikan initial state ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan daftar threads ketika diberikan action RECEIVE_THREADS', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Satu',
            body: 'Isi thread satu',
            category: 'general',
            createdAt: '2023-01-01T00:00:00.000Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('harus menambahkan thread baru di awal array ketika diberikan action ADD_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Isi thread satu',
        category: 'general',
        createdAt: '2023-01-01T00:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Dua',
      body: 'Isi thread dua',
      category: 'redux',
      createdAt: '2023-01-02T00:00:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('harus menambahkan userId ke upVotesBy dan menghapusnya dari downVotesBy ketika diberikan action TOGGLE_UP_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });

  it('harus menambahkan userId ke downVotesBy dan menghapusnya dari upVotesBy ketika diberikan action TOGGLE_DOWN_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });

  it('harus menghapus userId dari upVotesBy dan downVotesBy ketika diberikan action TOGGLE_NEUTRAL_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});
