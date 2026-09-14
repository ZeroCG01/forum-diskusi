import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButtons({
  upVotesBy = [],
  downVotesBy = [],
  onUpVote,
  onDownVote,
  authUserId = null,
}) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false;
  const voteScore = upVotesBy.length - downVotesBy.length;

  let scoreClass = 'vote-score';
  if (voteScore > 0) scoreClass += ' positive';
  if (voteScore < 0) scoreClass += ' negative';

  return (
    <div className="vote-buttons">
      <button
        type="button"
        className={`vote-btn ${isUpVoted ? 'active-up' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onUpVote();
        }}
        title="Dukung naik (Upvote)"
        aria-label="Upvote"
      >
        <FiThumbsUp />
      </button>
      <span className={scoreClass}>
        {voteScore}
      </span>
      <button
        type="button"
        className={`vote-btn ${isDownVoted ? 'active-down' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onDownVote();
        }}
        title="Dukung turun (Downvote)"
        aria-label="Downvote"
      >
        <FiThumbsDown />
      </button>
    </div>
  );
}

export default VoteButtons;
