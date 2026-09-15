/**
 * Skenario pengujian:
 *
 * - isPreloadReducer function
 *  - harus mengembalikan initial state ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan nilai isPreload baru ketika diberikan action SET_IS_PRELOAD
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('harus mengembalikan initial state ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan nilai isPreload baru ketika diberikan action SET_IS_PRELOAD', () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toBe(false);
  });
});
