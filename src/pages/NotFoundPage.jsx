import { Link } from 'react-router-dom';
import { FiAlertCircle, FiHome } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div className="empty-state" style={{ margin: '60px auto', maxWidth: '480px' }}>
      <div className="empty-state-icon" style={{ color: 'var(--danger)' }}>
        <FiAlertCircle />
      </div>
      <h1 className="empty-state-title" style={{ fontSize: '1.4rem' }}>
        404 - Halaman Tidak Ditemukan
      </h1>
      <p className="empty-state-desc">
        Halaman atau rute yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/" className="btn btn-primary btn-sm">
        <FiHome />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
