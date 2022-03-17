export const getJsonData = (path) => {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => JSON.parse(data));
};

export const runTransitionAnimation = (element) => {
  setTimeout(() => element.classList.add("animation-fade"), 30);
};
