import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoadingBar from './components/LoadingBar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.95rem',
      }}>
        Memuat aplikasi...
      </div>
    );
  }

  return (
    <div className="app-container">
      <LoadingBar />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route
            path="/new"
            element={(
              <ProtectedRoute>
                <NewThreadPage />
              </ProtectedRoute>
            )}
          />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
