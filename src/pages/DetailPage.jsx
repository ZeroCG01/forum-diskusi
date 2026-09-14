import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { postedAt } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const {
    title,
    body,
    createdAt,
    owner,
    category,
    comments = [],
    upVotesBy = [],
    downVotesBy = [],
  } = threadDetail;

  const authorName = owner?.name || 'Pengguna';
  const authorAvatar = owner?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;

  const handleUpVoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const handleDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const handleUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const handleDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  const handleAddComment = (content) => {
    return dispatch(asyncAddComment({ threadId: id, content }));
  };

  return (
    <div className="detail-page">
      <Link to="/" className="detail-back-link">
        <FiArrowLeft />
        <span>Kembali ke Daftar Diskusi</span>
      </Link>

      <article className="detail-card">
        <div className="detail-header">
          <h1 className="detail-title">{title}</h1>
          <div className="detail-meta-row">
            <div className="thread-author-info">
              <img
                src={authorAvatar}
                alt={authorName}
                className="thread-author-avatar"
                style={{ width: '40px', height: '40px' }}
              />
              <div>
                <span className="thread-author-name" style={{ fontSize: '0.98rem' }}>
                  {authorName}
                </span>
                <div className="thread-time">{postedAt(createdAt)}</div>
              </div>
            </div>
            {category && (
              <span className="thread-category-badge">
                #{category}
              </span>
            )}
          </div>
        </div>

        <div
          className="detail-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="detail-footer">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            onUpVote={handleUpVoteThread}
            onDownVote={handleDownVoteThread}
            authUserId={authUser?.id}
          />
        </div>
      </article>

      <section className="comments-section">
        <h2 className="comments-title">
          Tanggapan ({comments.length})
        </h2>

        {authUser ? (
          <CommentInput onSubmitComment={handleAddComment} />
        ) : (
          <div className="comment-login-prompt">
            <p>Anda harus masuk untuk memberikan tanggapan pada diskusi ini.</p>
            <Link to="/login" className="btn btn-primary btn-sm">
              <FiLogIn />
              <span>Masuk untuk Menanggapi</span>
            </Link>
          </div>
        )}

        <CommentList
          comments={comments}
          authUserId={authUser?.id}
          onUpVote={handleUpVoteComment}
          onDownVote={handleDownVoteComment}
        />
      </section>
    </div>
  );
}

export default DetailPage;
