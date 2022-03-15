import { HeaderMain } from "./header-main.js";
import { TopBar } from "./top-bar.js";

const header = () => {
  const topBar = new TopBar();
  const headerMain = new HeaderMain();
  topBar.render();
  headerMain.render();
};

export { header };
