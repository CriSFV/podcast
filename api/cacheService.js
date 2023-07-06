
const get = (key, defaultValue) => {
  const localStorageData = localStorage.getItem(key);
  return localStorageData ? JSON.parse(localStorageData) : defaultValue;
};

const set = (key, value) => {
  const localStorageData = JSON.stringify(value);
  localStorage.setItem(key, localStorageData);
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

export default {get, set, remove, clear};
