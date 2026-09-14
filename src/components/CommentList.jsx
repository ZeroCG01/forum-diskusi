import CommentItem from './CommentItem';

function CommentList({
  comments = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  if (comments.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '24px 16px' }}>
        <p className="empty-state-desc" style={{ margin: 0 }}>
          Belum ada tanggapan untuk diskusi ini. Jadilah yang pertama memberikan pendapat!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

export default CommentList;
