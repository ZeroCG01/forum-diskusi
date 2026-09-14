import VoteButtons from './VoteButtons';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const authorName = owner?.name || 'Pengguna';
  const authorAvatar = owner?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-author-info">
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
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="comment-footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          authUserId={authUserId}
        />
      </div>
    </div>
  );
}

export default CommentItem;
