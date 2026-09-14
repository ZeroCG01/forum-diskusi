import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator,
} from '../states/filterCategory/action';
import CategoryFilter from '../components/CategoryFilter';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const filterCategory = useSelector((state) => state.filterCategory);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const set = new Set();
    threads.forEach((t) => {
      if (t.category && t.category.trim()) {
        set.add(t.category.trim().toLowerCase());
      }
    });
    return Array.from(set);
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!filterCategory) return threads;
    return threads.filter(
      (t) => t.category && t.category.trim().toLowerCase() === filterCategory.toLowerCase(),
    );
  }, [threads, filterCategory]);

  const handleSelectCategory = (cat) => {
    if (!cat || cat === filterCategory) {
      dispatch(clearFilterCategoryActionCreator());
    } else {
      dispatch(setFilterCategoryActionCreator(cat));
    }
  };

  const handleUpVote = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const handleDownVote = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  return (
    <section>
      <div className="home-header">
        <div>
          <h1 className="home-title">Diskusi Komunitas</h1>
          <p className="home-subtitle">
            Eksplorasi topik, ajukan pertanyaan, dan bagikan wawasan Anda dengan anggota lainnya.
          </p>
        </div>
        <Link to="/new" className="btn btn-primary">
          <FiPlus />
          <span>Buat Diskusi</span>
        </Link>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={filterCategory}
        onSelectCategory={handleSelectCategory}
      />

      <ThreadList
        threads={filteredThreads}
        users={users}
        authUserId={authUser?.id}
        onUpVote={handleUpVote}
        onDownVote={handleDownVote}
        onCategoryClick={handleSelectCategory}
      />
    </section>
  );
}

export default HomePage;
