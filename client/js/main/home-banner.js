import { getJsonData } from "../util.js";

export const HomeBanner = function () {};

HomeBanner.prototype = {
  constructor: HomeBanner,
  createBannerImg: function (data) {
    return `
      <img
        class="home-Banner__img"
        src="${data.src}"
        alt="${data.alt}"
      />
    `;
  },
  createTodayImg: function (data) {
    return `
    <li>
    <div data-idx=${data.idx} ${data.selected ? ' class="selected"' : ""}></div>
    <img
      src="${data.src}"
      alt="${data.alt}"
      data-idx="${data.idx}"
    />
    </li>
    `;
  },
  createTemplate: function (BannerImg, todayShortcut) {
    return `
    <div class="home-banner">
        <div class="home-banner__wrapper">
          ${this.createBannerImg(BannerImg[0])}
          <ul class="home-banner__today-img-container flex-column">
            ${todayShortcut.map((todayBannerList) => this.createTodayImg(todayBannerList)).join("")}
          </ul>
        </div>
      </div>
    `;
  },
  changeBannerImg: function (bannerContainer, evt, data) {
    const bannerImg = document.querySelector(".home-Banner__img");
    const curSelected = bannerContainer.querySelector(".selected");
    const idx = evt.target.dataset.idx;
    const afterSelected = bannerContainer.children[idx].querySelector("div");

    bannerImg.src = data[idx]["src"];
    bannerImg.alt = data[idx]["alt"];
    curSelected.classList.remove("selected");
    afterSelected.classList.add("selected");
  },
  onClickEvents: function (data) {
    const bannerContainer = document.querySelector(".home-banner__today-img-container");
    bannerContainer.addEventListener("mouseover", (evt) => this.changeBannerImg(bannerContainer, evt, data));
  },
  render: function () {
    const homebanner = document.querySelector(".main-home");
    getJsonData("/main/HomeBanner").then((data) => {
      homebanner.insertAdjacentHTML("beforebegin", this.createTemplate(data["img"], data["todayShortcut"]));
      this.onClickEvents(data["img"]);
    });
  },
};
