import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';
import { asyncAddThread } from '../states/threads/action';

function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsLoading(true);
    const result = await dispatch(
      asyncAddThread({
        title: title.trim(),
        body: body.trim(),
        category: category.trim(),
      }),
    );
    setIsLoading(false);

    if (!result?.error) {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <Link to="/" className="detail-back-link">
        <FiArrowLeft />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="auth-card" style={{ maxWidth: '100%' }}>
        <div className="auth-header" style={{ textAlign: 'left', marginBottom: '22px' }}>
          <h1 className="auth-title">Buat Diskusi Baru</h1>
          <p className="auth-subtitle">
            Mulai topik percakapan atau ajukan pertanyaan ke komunitas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="thread-title" className="form-label">
              Judul Diskusi <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              id="thread-title"
              type="text"
              placeholder="Contoh: Bagaimana cara memahami Redux Thunk dengan mudah?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="thread-category" className="form-label">
              Kategori / Topik
            </label>
            <input
              id="thread-category"
              type="text"
              placeholder="Contoh: redux, react, javascript (opsional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="thread-body" className="form-label">
              Isi Diskusi <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <textarea
              id="thread-body"
              placeholder="Jelaskan detail topik yang ingin Anda diskusikan..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
              disabled={isLoading}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Link to="/" className="btn btn-secondary" disabled={isLoading}>
              Batal
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !title.trim() || !body.trim()}
            >
              <FiPlusCircle />
              <span>{isLoading ? 'Membuat Diskusi...' : 'Terbitkan Diskusi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewThreadPage;
