import CategoryFilter from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  argTypes: {
    onSelectCategory: { action: 'categorySelected' },
  },
};

export const Default = {
  args: {
    categories: ['react', 'redux', 'javascript', 'tips'],
    activeCategory: '',
  },
};

export const ActiveCategory = {
  args: {
    categories: ['react', 'redux', 'javascript', 'tips'],
    activeCategory: 'redux',
  },
};

export const EmptyCategories = {
  args: {
    categories: [],
    activeCategory: '',
  },
};
