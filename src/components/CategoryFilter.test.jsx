/**
 * Skenario pengujian:
 *
 * - CategoryFilter component
 *  - harus merender tombol '# Semua' dan seluruh chip kategori yang diberikan
 *  - harus memanggil onSelectCategory saat salah satu chip kategori diklik
 *  - tombol '# Semua' harus memiliki kelas active saat activeCategory kosong
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it("harus merender tombol '# Semua' dan seluruh chip kategori yang diberikan", () => {
    // arrange
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        activeCategory=""
        onSelectCategory={() => {}}
      />,
    );

    // assert
    expect(screen.getByRole('button', { name: /# semua/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#react/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#redux/i })).toBeInTheDocument();
  });

  it("tombol '# Semua' harus memiliki kelas active saat activeCategory kosong", () => {
    // arrange
    render(
      <CategoryFilter
        categories={['react']}
        activeCategory=""
        onSelectCategory={() => {}}
      />,
    );

    // assert
    const allBtn = screen.getByRole('button', { name: /# semua/i });
    expect(allBtn).toHaveClass('active');
  });

  it('harus memanggil onSelectCategory saat salah satu chip kategori diklik', async () => {
    // arrange
    const mockOnSelect = vi.fn();
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        activeCategory=""
        onSelectCategory={mockOnSelect}
      />,
    );
    const reactBtn = screen.getByRole('button', { name: /#react/i });

    // action
    await userEvent.click(reactBtn);

    // assert
    expect(mockOnSelect).toHaveBeenCalledWith('react');
  });
});
