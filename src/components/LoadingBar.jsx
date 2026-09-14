import { useSelector } from 'react-redux';

function LoadingBar() {
  const loading = useSelector((state) => state.loading);

  if (!loading) {
    return null;
  }

  return (
    <div className="top-loading-bar-wrapper" role="progressbar" aria-label="Memuat data">
      <div className="top-loading-bar" />
    </div>
  );
}

export default LoadingBar;
