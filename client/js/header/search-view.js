export const SearchView = function () {};
SearchView.prototype = {
  constructor: SearchView,
  createMenuView(data) {
    return `<div class="search-bar__view-menu animation-init" tabindex="0">
      ${data.reduce((divElement, content) => divElement + `<div>${content}</div>`, "")}
    </div>`;
  },
  createSearchView() {
    return `<div class="search-bar__view-content animation-init" tabindex="0"></div>`;
  },
};
