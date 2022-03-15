export const getJsonData = (path) => {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => JSON.parse(data));
};
