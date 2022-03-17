export const DropBox = function () {};
DropBox.prototype = {
  constructor: DropBox,
  createDropBox(data, className) {
    return `<div class="${className} animation-init" tabindex="0">
      ${data ? data.reduce((divElement, content) => divElement + `<div>${content}</div>`, "") : ""}
    </div>`;
  },
};
