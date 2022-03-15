export const HomeBaner = function () {};

HomeBaner.prototype = {
  constructor: HomeBaner,
  createTemplate: function () {
    return `
    <div class="home-baner">
        <div class="home-baner__wrapper">
          <img
            class="home-baner__img"
            src="https://static.coupangcdn.com/pa/cmg_paperboy/image/1647244593217/220210_%EC%BF%A0%ED%8C%A1%EB%B9%84%EC%A6%88_SMD-15590_PC%284%29.jpg"
            alt="쿠팡 비즈"
          />
          <ul class="home-baner__today-img-container flex-column">
            <li>
              <img
                src="https://static.coupangcdn.com/ca/cmg_paperboy/image/1647244674896/220315_C1_%EC%A3%BC%EB%B0%A9%EC%9A%A9%ED%92%88_SMD-16081_Item.jpg"
                alt="주방 용품"
              />
            </li>
            <li>
              <img
                src="https://static.coupangcdn.com/ya/cmg_paperboy/image/1647244595644/220210_%EC%BF%A0%ED%8C%A1%EB%B9%84%EC%A6%88_SMD-15590_ITEM%284%29.jpg"
                alt="쿠팡 비즈"
              />
            </li>
            <li>
              <img
                src="https://static.coupangcdn.com/fa/cmg_paperboy/image/1646983220719/C1-PC2%282%29.jpg"
                alt="풀메디슨 생필품"
              />
            </li>
            <li>
              <img
                src="https://static.coupangcdn.com/na/cmg_paperboy/image/1647216951185/C1-PC2%289%29.jpg"
                alt="피앤지 생필품"
              />
            </li>
            <li>
              <img
                src="https://static.coupangcdn.com/sa/cmg_paperboy/image/1647244629256/220315_C1_C%EC%97%90%EB%B9%84%EB%89%B4%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%9C%84%ED%81%AC_A_SMD-16080_item.jpg"
                alt="브랜드 위크"
              />
            </li>
            <li>
              <img
                src="https://image7.coupangcdn.com/image/ccm/banner/e182a90ff6529d8c28585ca393ad014d.png"
                alt="수입 식품관"
              />
            </li>
          </ul>
        </div>
      </div>
    `;
  },
  render: function () {
    const homeBaner = document.querySelector(".main-home");
    homeBaner.insertAdjacentHTML("beforebegin", this.createTemplate());
  },
};
