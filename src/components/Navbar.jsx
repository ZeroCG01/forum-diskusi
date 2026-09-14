import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMessageSquare, FiAward, FiPlus, FiLogOut, FiLogIn, FiUserCheck } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navbar() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <FiMessageSquare />
          </div>
          <span>RuangDiskusi</span>
        </Link>

        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <FiMessageSquare />
            <span>Diskusi</span>
          </NavLink>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FiAward />
            <span>Klasemen</span>
          </NavLink>
        </nav>

        <div className="navbar-auth">
          {authUser ? (
            <>
              <Link to="/new" className="btn btn-primary btn-sm">
                <FiPlus />
                <span>Buat Diskusi</span>
              </Link>
              <div className="user-profile-badge" title={authUser.email}>
                <img
                  src={authUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.name)}&background=random`}
                  alt={authUser.name}
                  className="user-avatar"
                />
                <span>{authUser.name.split(' ')[0]}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
                title="Keluar dari akun"
                aria-label="Logout"
              >
                <FiLogOut />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <FiLogIn />
                <span>Masuk</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <FiUserCheck />
                <span>Daftar</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
