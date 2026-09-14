import { Link } from 'react-router-dom';
import { FiMessageSquare } from 'react-icons/fi';
import VoteButtons from './VoteButtons';
import { postedAt, stripHtml } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUserId,
  onUpVote,
  onDownVote,
  onCategoryClick,
}) {
  const authorName = user?.name || 'Pengguna';
  const authorAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;
  const snippet = stripHtml(body);

  return (
    <article className="thread-item">
      <div className="thread-item-header">
        <div className="thread-author-info">
          <img
            src={authorAvatar}
            alt={authorName}
            className="thread-author-avatar"
            loading="lazy"
          />
          <div>
            <span className="thread-author-name">{authorName}</span>
            <div className="thread-time">{postedAt(createdAt)}</div>
          </div>
        </div>
        {category && (
          <button
            type="button"
            className="thread-category-badge"
            onClick={() => onCategoryClick && onCategoryClick(category)}
          >
            #{category}
          </button>
        )}
      </div>

      <div>
        <h2 className="thread-title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h2>
        {snippet && <p className="thread-snippet">{snippet}</p>}
      </div>

      <div className="thread-item-footer">
        <div className="thread-item-meta">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            authUserId={authUserId}
          />
          <Link to={`/threads/${id}`} className="thread-comment-count">
            <FiMessageSquare />
            <span>{totalComments} Komentar</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;
