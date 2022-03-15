import { getJsonData } from "../util.js";

export const HomeBaner = function () {};

HomeBaner.prototype = {
  constructor: HomeBaner,
  createBanerImg: function (data) {
    return `
      <img
        class="home-baner__img"
        src="${data.src}"
        alt="${data.img}"
      />
    `;
  },
  createTodayImg: function (data) {
    return `
    <li>
    <div${data.selected ? ' class="selected"' : ""}></div>
    <img
      src="${data.src}"
      alt="${data.alt}"
    />
    </li>
    `;
  },
  createTemplate: function (banerImg, todayShortcut) {
    console.log(banerImg);
    return `
    <div class="home-baner">
        <div class="home-baner__wrapper">
          ${this.createBanerImg(banerImg[0])}
          <ul class="home-baner__today-img-container flex-column">
            ${todayShortcut.map((todayBanerList) => this.createTodayImg(todayBanerList)).join("")}
          </ul>
        </div>
      </div>
    `;
  },
  render: function () {
    const homeBaner = document.querySelector(".main-home");
    getJsonData("/main/homeBaner").then((data) =>
      homeBaner.insertAdjacentHTML("beforebegin", this.createTemplate(data["img"], data["todayShortcut"]))
    );
  },
};
