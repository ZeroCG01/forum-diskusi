import { FiInbox } from 'react-icons/fi';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads = [],
  users = [],
  authUserId = null,
  onUpVote,
  onDownVote,
  onCategoryClick,
}) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FiInbox />
        </div>
        <h3 className="empty-state-title">Tidak ada diskusi ditemukan</h3>
        <p className="empty-state-desc">
          Belum ada diskusi untuk kategori ini. Jadilah yang pertama memulai topik diskusi baru!
        </p>
      </div>
    );
  }

  const userMap = new Map(users.map((user) => [user.id, user]));

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          user={userMap.get(thread.ownerId)}
          authUserId={authUserId}
          onUpVote={() => onUpVote(thread.id)}
          onDownVote={() => onDownVote(thread.id)}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
}

export default ThreadList;
