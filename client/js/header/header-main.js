import { getJsonData } from "../util.js";

export const HeaderMain = function () {};

HeaderMain.prototype = {
  constructor: HeaderMain,
  createEventsCategory: function (data) {
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
  createTemplate: function (data) {
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
          <div class="search-bar__menu flex-row-between flex-center">
            <div class="small-text">전체</div>
            <div class="search-bar__menu__button"></div>
          </div>
          <input
            class="search-bar__search-area"
            type="text"
            placeholder="찾고 싶은 상품을 검색해 보세요!"
          />
          <div class="search-bar__search-button"></div>
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
  render: function () {
    const headerMain = document.querySelector(".header");
    getJsonData("/header/eventCategory").then((data) => {
      headerMain.insertAdjacentHTML("beforeend", this.createTemplate(data));
    });
  },
};
