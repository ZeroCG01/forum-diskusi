/**
 * Skenario pengujian:
 *
 * - LeaderboardItem component
 *  - harus merender informasi peringkat, nama pengguna, email, dan skor dengan benar
 *  - harus memberikan kelas badge khusus untuk peringkat 1, 2, dan 3
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeaderboardItem from './LeaderboardItem';

describe('LeaderboardItem component', () => {
  it('harus merender informasi peringkat, nama pengguna, email, dan skor dengan benar', () => {
    // arrange
    const user = {
      id: 'user-1',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas',
    };
    render(
      <LeaderboardItem
        rank={1}
        user={user}
        score={100}
      />,
    );

    // assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Dimas Saputra')).toBeInTheDocument();
    expect(screen.getByText('dimas@dicoding.com')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('harus memberikan kelas badge khusus untuk peringkat 1, 2, dan 3', () => {
    // arrange
    const user = {
      id: 'user-1',
      name: 'Dimas',
      email: 'dimas@dicoding.com',
    };
    const { rerender } = render(<LeaderboardItem rank={1} user={user} score={100} />);
    expect(screen.getByText('1')).toHaveClass('rank-1');

    rerender(<LeaderboardItem rank={2} user={user} score={90} />);
    expect(screen.getByText('2')).toHaveClass('rank-2');

    rerender(<LeaderboardItem rank={3} user={user} score={80} />);
    expect(screen.getByText('3')).toHaveClass('rank-3');
  });
});
