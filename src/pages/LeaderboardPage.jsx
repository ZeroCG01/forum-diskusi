import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiAward } from 'react-icons/fi';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <section>
      <div className="home-header">
        <div>
          <h1 className="home-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiAward style={{ color: '#eab308' }} />
            <span>Klasemen Pengguna Aktif</span>
          </h1>
          <p className="home-subtitle">
            Daftar kontributor dengan poin partisipasi tertinggi di RuangDiskusi.
          </p>
        </div>
      </div>

      <div className="leaderboard-card">
        <div className="leaderboard-table-header">
          <div>Posisi</div>
          <div>Pengguna</div>
          <div style={{ textAlign: 'right', paddingRight: '8px' }}>Skor</div>
        </div>

        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            rank={index + 1}
            user={item.user}
            score={item.score}
          />
        ))}

        {leaderboards.length === 0 && (
          <div className="empty-state" style={{ border: 'none' }}>
            <p className="empty-state-desc">Belum ada data klasemen yang tersedia.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeaderboardPage;
