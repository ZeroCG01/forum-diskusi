/**
 * Skenario pengujian:
 *
 * - asyncPopulateLeaderboards thunk
 *  - harus men-dispatch action secara benar ketika pengambilan data leaderboard berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan data leaderboard gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import {
  receiveLeaderboardsActionCreator,
  asyncPopulateLeaderboards,
} from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const fakeLeaderboards = [
  {
    user: { id: 'user-1', name: 'Dimas', email: 'dimas@dicoding.com' },
    score: 100,
  },
];
const fakeError = new Error('Gagal memuat leaderboard');

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika pengambilan data leaderboard berhasil', async () => {
    // arrange
    api.getLeaderboards = vi.fn().mockResolvedValue(fakeLeaderboards);
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.getLeaderboards).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboards));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika pengambilan data leaderboard gagal', async () => {
    // arrange
    api.getLeaderboards = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});
