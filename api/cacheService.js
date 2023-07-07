import { checkIf24hPassedToValidateInfo } from "../helpers/checkIf24hHasPassed";

const get = (key, defaultValue) => {
  try {
    const localStorageData = localStorage.getItem(key);
    const moreThan24hHasPassed =
      checkIf24hPassedToValidateInfo(localStorageData.date);
    return localStorageData && !moreThan24hHasPassed
      ? JSON.parse(localStorageData).data
      : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const set = (key, value) => {
  try {
    const data = {date: Date.now(), data: value}
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export default { get, set, remove, clear };
