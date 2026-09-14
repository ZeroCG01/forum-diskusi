function CategoryFilter({
  categories = [],
  activeCategory = '',
  onSelectCategory,
}) {
  return (
    <div className="category-filter-section">
      <div className="category-filter-header">Kategori Populer</div>
      <div className="category-chips-container">
        <button
          type="button"
          className={`category-chip ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => onSelectCategory('')}
        >
          # Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
