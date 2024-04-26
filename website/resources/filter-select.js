(() => {
  const selector = document.querySelector('.js-filter-select');
  selector.addEventListener('change', () => {
    document.location = selector.value === 'year' ? 'index.html' : 'index_bytheme.html';
  });
})();
