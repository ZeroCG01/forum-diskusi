/**
 * Skenario pengujian:
 *
 * - asyncReceiveThreadDetail thunk
 *  - harus men-dispatch action secara benar ketika pengambilan detail thread berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan detail thread gagal
 *
 * - asyncAddComment thunk
 *  - harus men-dispatch action secara benar ketika penambahan komentar berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika penambahan komentar gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
} from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Body Thread',
  createdAt: '2023-01-01T00:00:00.000Z',
  owner: { id: 'user-1', name: 'Dimas', avatar: 'https://ui-avatars.com/api/?name=Dimas' },
  comments: [],
  upVotesBy: [],
  downVotesBy: [],
};

const fakeComment = {
  id: 'comment-1',
  content: 'Komentar baru',
  createdAt: '2023-01-01T01:00:00.000Z',
  owner: { id: 'user-1', name: 'Dimas', avatar: 'https://ui-avatars.com/api/?name=Dimas' },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeError = new Error('Terjadi kesalahan');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    delete api._getThreadDetail;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika pengambilan detail thread berhasil', async () => {
    // arrange
    api.getThreadDetail = vi.fn().mockResolvedValue(fakeThreadDetail);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan detail thread gagal', async () => {
    // arrange
    api.getThreadDetail = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.createComment = api._createComment;
    delete api._createComment;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika penambahan komentar berhasil', async () => {
    // arrange
    api.createComment = vi.fn().mockResolvedValue(fakeComment);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar baru',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: 'Komentar baru',
    });
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
    expect(result).toEqual({ error: false });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika penambahan komentar gagal', async () => {
    // arrange
    api.createComment = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar baru',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(result).toEqual({ error: true, message: fakeError.message });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});
