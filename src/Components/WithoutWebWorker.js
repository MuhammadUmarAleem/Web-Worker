// src/SortWithoutWebWorker.js
const sortWithoutWebWorker = (array) => {
  return array.slice().sort((a, b) => {
    const dateA = new Date(a.createdt);
    const dateB = new Date(b.createdt);
    return dateA - dateB;
  });
};

export default sortWithoutWebWorker;
