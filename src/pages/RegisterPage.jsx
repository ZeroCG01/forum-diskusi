import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserCheck } from 'react-icons/fi';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const [name, setName] = useState('');
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
    if (!name.trim() || !email.trim() || !password.trim()) return;

    if (password.length < 6) {
      alert('Kata sandi harus minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    setIsLoading(false);

    if (!result?.error) {
      alert('Akun berhasil dibuat! Silakan masuk.');
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">Bergabung bersama komunitas diskusi kami</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              Nama Lengkap
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              Kata Sandi (min. 6 karakter)
            </label>
            <input
              id="reg-password"
              type="password"
              placeholder="Buat kata sandi aman..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '8px' }}
            disabled={isLoading || !name.trim() || !email.trim() || !password.trim()}
          >
            <FiUserCheck />
            <span>{isLoading ? 'Mendaftarkan...' : 'Daftar Akun'}</span>
          </button>
        </form>

        <div className="auth-footer">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="auth-link">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
