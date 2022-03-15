import { header } from "./header/index.js";
import { mainHome } from "./main/index.js";

(() => {
  // header가 데이터를 얻어와서 렌더하게 되면 그때부터는 promise - then 처럼 비동기 로직 순서 제어해야함
  header();
  mainHome();
})();
