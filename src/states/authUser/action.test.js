/**
 * Skenario pengujian:
 *
 * - asyncSetAuthUser thunk
 *  - harus men-dispatch action dan menyimpan token serta authUser secara benar ketika login sukses
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika login gagal
 *
 * - asyncRegisterUser thunk
 *  - harus men-dispatch action secara benar ketika registrasi berhasil
 *  - harus men-dispatch action dan menampilkan alert secara benar ketika registrasi gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import {
  setAuthUserActionCreator,
  asyncSetAuthUser,
  asyncRegisterUser,
} from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';

const fakeToken = 'fake-token-123';
const fakeUser = {
  id: 'user-1',
  name: 'Dimas Saputra',
  email: 'dimas@dicoding.com',
  avatar: 'https://ui-avatars.com/api/?name=Dimas',
};
const fakeError = new Error('Ups, ada kesalahan');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action dan menyimpan token serta authUser secara benar ketika login sukses', async () => {
    // arrange
    api.login = vi.fn().mockResolvedValue(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'dimas@dicoding.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.login).toHaveBeenCalledWith({ email: 'dimas@dicoding.com', password: 'password' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika login gagal', async () => {
    // arrange
    api.login = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'wrong@dicoding.com', password: 'wrong' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
    window.alert = vi.fn();
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
    vi.restoreAllMocks();
  });

  it('harus men-dispatch action secara benar ketika registrasi berhasil', async () => {
    // arrange
    api.register = vi.fn().mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // action
    const result = await asyncRegisterUser({
      name: 'Dimas',
      email: 'dimas@dicoding.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.register).toHaveBeenCalledWith({
      name: 'Dimas',
      email: 'dimas@dicoding.com',
      password: 'password',
    });
    expect(result).toEqual({ error: false });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('harus men-dispatch action dan menampilkan alert secara benar ketika registrasi gagal', async () => {
    // arrange
    api.register = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();

    // action
    const result = await asyncRegisterUser({
      name: 'Dimas',
      email: 'dimas@dicoding.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(result).toEqual({ error: true, message: fakeError.message });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});
