(() => {
  function debounce(func, ms = 100) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }
    
  const search = document.querySelector('.js-search');
  search.placeholder = {"en": "Search for a vote", "fr": "Chercher une votation", "de": "Eine Abstimmung suchen"}[lang];

  /** @type {import("convex/browser")["ConvexClient"]} */
  const ConvexClient = convex.ConvexClient;
  const client = new ConvexClient('https://artful-minnow-484.convex.cloud');
  /** @type {import("../../convex/_generated/api")["api"]} */
  const api = convex.anyApi;

  const listAllResults = document.querySelector('#list_refs');
  const listSearchResults = document.querySelector('.js-search-results');
  const loader = document.querySelector('.js-search-loader');

  const doQuery = debounce(async (query) => {
    const results = await client.action(api.search.default, { query });

    if (query !== search.value.trim()) return;

    let html = '';
    for (const row of results) {
      html += showVote(row, lang);
    }

    loader.style.display = 'none';
    listSearchResults.innerHTML = html;
  });

  search.addEventListener('input', async () => {
    listSearchResults.innerHTML = '';
    const query = search.value.trim();
    if (query === '') {
      listAllResults.style.display = 'block';
      loader.style.display = 'none';
      return;
    }

    listAllResults.style.display = 'none';
    loader.style.display = 'block';

    doQuery(query);
  });

})();
