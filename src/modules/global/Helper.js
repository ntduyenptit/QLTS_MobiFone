export function buildTree(arr) {
  const tree = [];
  mappedArr = {};
  let arrElem;
  let mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id].children = [];
  }


  for (const id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentId) {
        mappedArr[mappedElem.parentId].children.push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

export const convertTextToUpperCase = (text) => {
  // To convert Upper Case
  const upperCaseText = text.toUpperCase();
  return upperCaseText;
};

export const convertTextToLowerCase = (text) => {
  // To convert Lower Case
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText;
};

export const convertTimeFormatToLocaleDate = (time) => {
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (time.match(reg)) {
    return time;
  }
  const date = new Date(time);
  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  let dateString = date.toLocaleDateString('vi-VN', formatOptions);
  // => "02/17/2017, 11:32 PM"

  dateString = dateString.replace(',', '');
  return dateString;
}