/**
 * Skenario pengujian:
 *
 * - filterCategoryReducer function
 *  - harus mengembalikan initial state ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan kategori baru ketika diberikan action SET_FILTER_CATEGORY
 *  - harus mengembalikan string kosong ketika diberikan action CLEAR_FILTER_CATEGORY
 */

import { describe, it, expect } from 'vitest';
import filterCategoryReducer from './reducer';
import { ActionType } from './action';

describe('filterCategoryReducer function', () => {
  it('harus mengembalikan initial state ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = '';
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan kategori baru ketika diberikan action SET_FILTER_CATEGORY', () => {
    // arrange
    const initialState = '';
    const action = {
      type: ActionType.SET_FILTER_CATEGORY,
      payload: {
        category: 'redux',
      },
    };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toBe('redux');
  });

  it('harus mengembalikan string kosong ketika diberikan action CLEAR_FILTER_CATEGORY', () => {
    // arrange
    const initialState = 'redux';
    const action = {
      type: ActionType.CLEAR_FILTER_CATEGORY,
    };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toBe('');
  });
});
