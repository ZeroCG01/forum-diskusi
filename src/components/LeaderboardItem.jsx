function LeaderboardItem({
  rank,
  user,
  score,
}) {
  const userName = user?.name || 'Pengguna';
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;
  const userEmail = user?.email || '';

  let rankClass = 'rank-badge';
  if (rank === 1) rankClass += ' rank-1';
  if (rank === 2) rankClass += ' rank-2';
  if (rank === 3) rankClass += ' rank-3';

  return (
    <div className="leaderboard-item">
      <div>
        <span className={rankClass}>{rank}</span>
      </div>
      <div className="leaderboard-user">
        <img
          src={userAvatar}
          alt={userName}
          className="leaderboard-avatar"
          loading="lazy"
        />
        <div>
          <div className="leaderboard-name">{userName}</div>
          {userEmail && <div className="leaderboard-email">{userEmail}</div>}
        </div>
      </div>
      <div className="leaderboard-score">{score}</div>
    </div>
  );
}

export default LeaderboardItem;
