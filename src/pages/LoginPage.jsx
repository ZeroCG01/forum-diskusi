import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser) {
      navigate('/', { replace: true });
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    setIsLoading(false);

    if (!result?.error) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Selamat Datang</h1>
          <p className="auth-subtitle">Masuk ke akun RuangDiskusi Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Kata Sandi
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Masukkan kata sandi..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '8px' }}
            disabled={isLoading || !email.trim() || !password.trim()}
          >
            <FiLogIn />
            <span>{isLoading ? 'Sedang Masuk...' : 'Masuk ke Akun'}</span>
          </button>
        </form>

        <div className="auth-footer">
          Belum memiliki akun?{' '}
          <Link to="/register" className="auth-link">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
