/**
 * Skenario pengujian:
 *
 * - authUserReducer function
 *  - harus mengembalikan initial state ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan authUser ketika diberikan action SET_AUTH_USER
 *  - harus mengembalikan null ketika diberikan action UNSET_AUTH_USER
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('harus mengembalikan initial state ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan authUser ketika diberikan action SET_AUTH_USER', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'Dimas Saputra',
          email: 'dimas@dicoding.com',
          avatar: 'https://ui-avatars.com/api/?name=Dimas',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('harus mengembalikan null ketika diberikan action UNSET_AUTH_USER', () => {
    // arrange
    const initialState = {
      id: 'user-1',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBe(123);
  });
});
