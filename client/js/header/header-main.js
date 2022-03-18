import { getJsonData } from "../util.js";
import { DropBox } from "../component/dropbox.js";
import { getLocalStorageForArray, setLocalStorageForArray } from "../component/local-storage.js";
export const HeaderMain = function () {
  this.searchViewMenuDropBox = this.setDropBoxInfo("search-bar__menu", "search-bar__view-menu", "search-bar");
  this.searchViewContentDropBox = this.setDropBoxInfo(
    "search-bar__search-area",
    "search-bar__view-content",
    "search-bar"
  );
  this.searchViewContentDropBox.dropBox = this.createDropBoxTemplate(
    false,
    "search-bar__view-content",
    null,
    this.recentSearchArea()
  );
  this.recentSearchKeyWord = "recentSearchKeyWord";
};

const headerMainMethod = {
  constructor: HeaderMain,
  createEventsCategory(data) {
    return `
      <div class="search-section__events-category flex-row-between">
        <img
          class="events-category__logo-img"
          src="${data.img.src}"
          alt="${data.img.alt}"
        />
        <div class="events-category__text small-text">${data.content}</div>
        <img
          class="new-icon${data.img.new ? "" : " display-none"}"
          src="https://static.coupangcdn.com/image/coupang/common/ico_new.png"
          alt="신규아이콘"
        />
      </div>
    `;
  },
  createTemplate(data) {
    return `
    <div class="header-main thousand-width-center">
    <div class="category">
      <span class="category__text icon-card__text">카테고리</span>
    </div>
    <section class="search-section flex-column">
      <div class="search-section__main flex-row-between flex-center">
        <img
          class="homepage-logo"
          src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
          alt="메인로고"
        />
        <div class="search-bar">
          <div class="search-bar__menu flex-row-between flex-center" tabindex="0">
              <div class="search-bar__menu__text small-text">전체</div>
              <div class="search-bar__menu__button"></div>
          </div>
          <form class="search-bar__form">
            <label for="main-search-bar"></label>
            <input
              id="main-search-bar"
              class="search-bar__search-area"
              type="text"
              placeholder="찾고 싶은 상품을 검색해 보세요!"
            />
            <div class="search-bar__search-button"></div>
          </form>
        </div>
        <div class="search-bar-icons">
          <div class="search-bar-icon-card icon-card">
            <div class="icon-card__profile-img icon-card__img flex-column flex-center"></div>
            <div class="background-img icon-card__text">마이쿠팡</div>
          </div>
          <div class="search-bar-icon-card icon-card">
            <div class="icon-card__shopping-cart-img icon-card__img flex-column flex-center"></div>
            <div class="icon-card__text">장바구니</div>
          </div>
        </div>
      </div>
      <div class="search-section__events flex">
        ${data.headerEventCategoryData
          .map((todayEventList) => this.createEventsCategory(todayEventList))
          .join("")}
      </div>
    </section>
    </div>`;
  },
  createRecentSearchByLocalStorage(curLocalStorage) {
    return curLocalStorage
      .reverse()
      .reduce(
        (divElement, content) => divElement + `<div class="recentSearch-area__text">${content}</div>`,
        ""
      );
  },
  recentSearchArea() {
    const curLocalStorage = getLocalStorageForArray(this.recentSearchKeyWord);
    return `
    <div class="recentSearch-area">
      <div class="recentSearch-area__header">
      <div class="recentSearch-area__text">최근 검색어</div>
      </div>
      <div class="recentSearch-area__main">
        ${curLocalStorage.length > 0 ? this.createRecentSearchByLocalStorage(curLocalStorage) : ""}
      </div>
      <div class="recentSearch-area__footer">
        <div class="recentSearch-area__text">전체삭제</div>
        <div class="recentSearch-area__text">최근검색어끄기</div>
      </div>
    </div>
    `;
  },
  renderHeaderEventCategory() {
    const headerMain = document.querySelector(".header");
    return getJsonData("/header/eventCategory").then((data) => {
      headerMain.insertAdjacentHTML("beforeend", this.createTemplate(data));
    });
  },
  renderSearchMenuDropBox() {
    return getJsonData("/header/searchBarMenu").then((data) => {
      this.searchViewMenuDropBox.dropBox = this.createDropBoxTemplate(data, "search-bar__view-menu");
    });
  },
  renderSearchAreaDropBox(data, keyWord) {
    if (keyWord.length === 0) {
      data = null;
    }
    return (this.searchViewContentDropBox.dropBox = this.createDropBoxTemplate(
      data,
      "search-bar__view-content",
      keyWord,
      this.recentSearchArea()
    ));
  },
  render() {
    this.renderHeaderEventCategory()
      .then(() => {
        return this.renderSearchMenuDropBox();
      })
      .then(() => {
        this.onDropBoxRenderEvent(this.searchViewMenuDropBox);
        this.onDropBoxRenderEvent(this.searchViewContentDropBox);
        this.onSearchBarInputEvent();
        this.onSubmitSearchBar();
        this.onSubmitSearchBarByButtonClick();
      });
  },
  createSearchBarAutoComplete(keyWord) {
    fetch(`https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${keyWord}`)
      .then((res) => res.json())
      .then((data) => data.suggestions.map((v) => v.value))
      .then((data) => {
        return this.renderSearchAreaDropBox(data, keyWord);
      })
      .then(() => {
        this.reRenderDropBox(this.searchViewContentDropBox);
      });
  },
  onSubmitSearchBarByButtonClick() {
    const searchButton = document.querySelector(".search-bar__search-button");
    searchButton.addEventListener("click", (evt) => {
      setLocalStorageForArray(this.recentSearchKeyWord, this.searchArea.value);
    });
  },
  onSearchBarInputEvent() {
    this.searchArea = document.querySelector(".search-bar__search-area");
    this.searchArea.addEventListener("input", (e) => {
      this.createSearchBarAutoComplete(this.searchArea.value);
    });
  },
  onSubmitSearchBar() {
    const searchForm = document.querySelector(".search-bar__form");
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setLocalStorageForArray(this.recentSearchKeyWord, this.searchArea.value);
    });
  },
};
HeaderMain.prototype = Object.assign(Object.create(DropBox.prototype), headerMainMethod);
