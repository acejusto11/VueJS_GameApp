export function saveItemFromLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

export function getItemFromLocalStorage(key) {
  return window.localStorage.getItem(key);
}

export default {
  saveItemFromLocalStorage,
  getItemFromLocalStorage
};
