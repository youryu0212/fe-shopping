import { getJsonData } from "../util.js";

export const HomeBanner = function () {};

HomeBanner.prototype = {
  constructor: HomeBanner,
  createBannerImg(data) {
    return `
      <img
        class="home-Banner__img"
        src="${data.src}"
        alt="${data.alt}"
      />
    `;
  },
  createTodayImg(data) {
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
  createTemplate(BannerImg, todayShortcut) {
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
  changeBannerImg(bannerContainer, idx, data) {
    const bannerImg = document.querySelector(".home-Banner__img");
    const curSelected = bannerContainer.querySelector(".selected");
    const afterSelected = bannerContainer.children[idx].querySelector("div");
    if (curSelected === afterSelected) {
      return;
    }
    bannerImg.src = data[idx]["src"];
    bannerImg.alt = data[idx]["alt"];
    curSelected.classList.remove("selected");
    afterSelected.classList.add("selected");
  },
  carouselHandler(data) {
    const bannerList = document.querySelector(".home-banner__today-img-container");
    const carouseLength = bannerList.children.length;
    const curIdx = Number(document.querySelector(".selected").dataset.idx);
    const nextIdx = curIdx < carouseLength - 1 ? curIdx + 1 : 0;
    this.changeBannerImg(bannerList, nextIdx, data);
  },
  startCarousel(data) {
    this.timer = setInterval(() => this.carouselHandler(data), 2000);
  },
  stopCarousel() {
    clearInterval(this.timer);
  },
  onBanerChangeEvent(data) {
    const bannerContainer = document.querySelector(".home-banner__today-img-container");
    bannerContainer.addEventListener("mouseover", (evt) => {
      this.changeBannerImg(bannerContainer, evt.target.dataset.idx, data);
      this.stopCarousel();
    });
    bannerContainer.addEventListener("mouseout", () => this.startCarousel(data));
  },
  render() {
    const homebanner = document.querySelector(".main-home");
    getJsonData("/main/HomeBanner").then((data) => {
      homebanner.insertAdjacentHTML("beforebegin", this.createTemplate(data["img"], data["todayShortcut"]));
      this.onClickEvents(data["img"]);
      this.startCarousel(data["img"]);
    });
  },
};
