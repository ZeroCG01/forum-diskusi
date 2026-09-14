import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

function CommentInput({ onSubmitComment }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const result = await onSubmitComment(content);
    setIsSubmitting(false);

    if (!result?.error) {
      setContent('');
    }
  };

  return (
    <div className="comment-input-card">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Tulis balasan atau tanggapan Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          disabled={isSubmitting}
        />
        <div className="comment-input-actions">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isSubmitting || !content.trim()}
          >
            <FiSend />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Tanggapan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentInput;
