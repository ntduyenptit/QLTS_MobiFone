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
};

export const getColorByType = (type) => {
  switch (type) {
    case "Chưa sử dụng":
      case "Tài sản chưa sử dụng":
      return "#600080";
    case "Đang sử dụng":
      case "Tài sản đang sử dụng":
      return "#9900cc";
      case 3:
        return "#FFBF00";
    default:
      return null;
  }
}

export const convertTrangThai = (int) => {
  switch (int) {
    case 1:
      return "Đang kiểm kê";
    case 2:
      return "Đã kết thúc";
    case 0:
      return "Chưa bắt đầu";
    default:
      return null;
  }
}