/**
 * Skenario pengujian:
 *
 * - asyncAddThread thunk
 *  - harus men-dispatch action secara benar ketika pembuatan thread berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika pembuatan thread gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import {
  addThreadActionCreator,
  asyncAddThread,
} from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Baru',
  body: 'Isi Baru',
  category: 'react',
  createdAt: '2023-01-01T00:00:00.000Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
};
const fakeError = new Error('Gagal membuat thread');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika pembuatan thread berhasil', async () => {
    // arrange
    api.createThread = vi.fn().mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Judul Baru',
      body: 'Isi Baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.createThread).toHaveBeenCalledWith({
      title: 'Judul Baru',
      body: 'Isi Baru',
      category: 'react',
    });
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(result).toEqual({ error: false, thread: fakeThread });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika pembuatan thread gagal', async () => {
    // arrange
    api.createThread = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Judul Baru',
      body: 'Isi Baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(result).toEqual({ error: true, message: fakeError.message });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});
