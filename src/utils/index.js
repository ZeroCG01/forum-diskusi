function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return 'baru saja';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffDays < 7) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffWeeks < 4) {
    return `${diffWeeks} minggu yang lalu`;
  }
  if (diffMonths < 12) {
    return `${diffMonths} bulan yang lalu`;
  }
  return `${diffYears} tahun yang lalu`;
}

function stripHtml(html = '') {
  if (!html) return '';
  // Replace break tags with spaces, then strip any HTML tags
  return html
    .replace(/<br\s*[/]?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export { postedAt, stripHtml };
