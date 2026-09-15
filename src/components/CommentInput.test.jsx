/**
 * Skenario pengujian:
 *
 * - CommentInput component
 *  - harus menangani pengetikan teks komentar secara benar
 *  - harus memanggil fungsi onSubmitComment dengan konten yang tepat saat form disubmit
 *  - tombol kirim harus berstatus disabled ketika input komentar kosong
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('harus menangani pengetikan teks komentar secara benar', async () => {
    // arrange
    render(<CommentInput onSubmitComment={() => {}} />);
    const textarea = screen.getByPlaceholderText(/tulis balasan atau tanggapan anda/i);

    // action
    await userEvent.type(textarea, 'Komentar pengujian');

    // assert
    expect(textarea).toHaveValue('Komentar pengujian');
  });

  it('tombol kirim harus berstatus disabled ketika input komentar kosong', () => {
    // arrange
    render(<CommentInput onSubmitComment={() => {}} />);
    const submitBtn = screen.getByRole('button', { name: /kirim tanggapan/i });

    // assert
    expect(submitBtn).toBeDisabled();
  });

  it('harus memanggil fungsi onSubmitComment dengan konten yang tepat saat form disubmit', async () => {
    // arrange
    const mockOnSubmit = vi.fn().mockResolvedValue({ error: false });
    render(<CommentInput onSubmitComment={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(/tulis balasan atau tanggapan anda/i);
    const submitBtn = screen.getByRole('button', { name: /kirim tanggapan/i });

    // action
    await userEvent.type(textarea, 'Ini komentar yang dikirim');
    await userEvent.click(submitBtn);

    // assert
    expect(mockOnSubmit).toHaveBeenCalledWith('Ini komentar yang dikirim');
  });
});
