export const SearchView = function () {};
SearchView.prototype = {
  constructor: SearchView,
  createMenuView() {
    return `<div class="search-bar__view-menu animation-init" tabindex="0"></div>`;
  },
  createSearchView() {
    return `<div class="search-bar__view-content animation-init" tabindex="0"></div>`;
  },
};
