/**
 * Skenario pengujian:
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - harus men-dispatch action secara benar ketika pengambilan data berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan data gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test',
    body: 'Body Test',
    category: 'test',
    createdAt: '2023-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'Dimas',
    email: 'dimas@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dimas',
  },
];

const fakeError = new Error('Gagal memuat data');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    delete api._getAllUsers;
    delete api._getAllThreads;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika pengambilan data berhasil', async () => {
    // arrange
    api.getAllUsers = vi.fn().mockResolvedValue(fakeUsersResponse);
    api.getAllThreads = vi.fn().mockResolvedValue(fakeThreadsResponse);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan data gagal', async () => {
    // arrange
    api.getAllUsers = vi.fn().mockRejectedValue(fakeError);
    api.getAllThreads = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});
