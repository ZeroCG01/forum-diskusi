/**
 * Skenario pengujian:
 *
 * - VoteButtons component
 *  - harus merender jumlah skor vote dengan benar
 *  - harus memanggil fungsi onUpVote ketika tombol upvote diklik
 *  - harus memanggil fungsi onDownVote ketika tombol downvote diklik
 *  - harus menampilkan kelas active-up ketika pengguna telah memberikan upvote
 *  - harus menampilkan kelas active-down ketika pengguna telah memberikan downvote
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButtons from './VoteButtons';

describe('VoteButtons component', () => {
  it('harus merender jumlah skor vote dengan benar', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    // assert (2 - 1 = 1)
    const scoreElement = screen.getByText('1');
    expect(scoreElement).toBeInTheDocument();
  });

  it('harus memanggil fungsi onUpVote ketika tombol upvote diklik', async () => {
    // arrange
    const mockOnUpVote = vi.fn();
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={mockOnUpVote}
        onDownVote={() => {}}
      />,
    );
    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });

    // action
    await userEvent.click(upVoteBtn);

    // assert
    expect(mockOnUpVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil fungsi onDownVote ketika tombol downvote diklik', async () => {
    // arrange
    const mockOnDownVote = vi.fn();
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={() => {}}
        onDownVote={mockOnDownVote}
      />,
    );
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });

    // action
    await userEvent.click(downVoteBtn);

    // assert
    expect(mockOnDownVote).toHaveBeenCalledTimes(1);
  });

  it('harus menampilkan kelas active-up ketika pengguna telah memberikan upvote', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        onUpVote={() => {}}
        onDownVote={() => {}}
        authUserId="user-1"
      />,
    );

    // assert
    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });
    expect(upVoteBtn).toHaveClass('active-up');
  });

  it('harus menampilkan kelas active-down ketika pengguna telah memberikan downvote', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={['user-1']}
        onUpVote={() => {}}
        onDownVote={() => {}}
        authUserId="user-1"
      />,
    );

    // assert
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });
    expect(downVoteBtn).toHaveClass('active-down');
  });
});
