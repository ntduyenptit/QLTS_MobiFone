import moment from 'moment';
import { store } from '@app/redux/store';
import find from 'lodash/find';

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

export const getTextNCC = (type) => {
  const list = store.getState().filterNCCDataReducer.nccDataFilter;
  return find(list, e => e.id === type)?.displayName;
}

export const getTextLinhVucKinhDoanh = (type, list) => (
  find(list, e => e.id === type)?.displayName
)

const isEmpty = value => typeof value === 'undefined' || value === null || value === false;
const isNumeric = value => !isEmpty(value) && !Number.isNaN(Number(value));

export const getTextTinhThanhQuanHuyen = (type, list) => {
  console.log('33333123: ', type, list)
  if (isNumeric(type)) {
    return find(list, e => e.id === type)?.displayName;
  }
  return type;
}


export const convertTimeFormatToLocaleDateFullTime = (time) => {
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (time.match(reg)) {
    return time;
  }
  const date = new Date(time);
  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: 'numeric'
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
      return "#FF0000";
    case "Tài sản mất":
    case "Mất":
      return "#9900cc";
    case "TS hỏng":
    case "Hỏng"  :
      return "#29088A";
    case "TS thanh lý":
    case "Thanh lý":
      return "#FFBF00";
    case "Tài sản hủy":
    case "Hủy":  
      return "#0000FF";
    case "TS sửa chữa/bảo dưỡng":
    case "Sửa chữa":
    case "Bảo dưỡng":
      return "8A2908";
    default:
      return 'black';
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

export const convertNguonKinhphi = (int) => {
  switch (int) {
    case 1:
      return "Quỹ phát triển khoa học công nghệ";
    case 2:
      return "Sản xuất kinh doanh";
    case 3:
      return "Đầu tư";
    default:
      return null;
  }
}

export const convertLoaiTs = (int, listTs) => {
  for (let i= 0; i< listTs.length; i++)
    if (listTs[i].value == int) return listTs[i].text;
    
}
export const convertTrangthaiTaisan = (int) => {
  switch (int) {
    case 0:
      return "Khởi tạo";
    case 1:
      return "Cấp phát";
    case 2:
      return "Điều chuyển";
    case 3:
      return "Thu hồi";
    case 4:
      return "Đang sử dụng";
    case 5:
      return "Sửa chữa";
    case 6:
      return "Bảo dưỡng";
    case 7:
      return "Mất";
    case 8:
      return "Hỏng";
    case 9:
      return "Thanh lý";
    case 10:
      return "Hủy";

    default:
      return null;
  }
}

export const convertHinhthucTaisan = (int) => {
  switch (int) {
    case 0:
    case 1:
    case 2:
    case 3:
      return "Chưa sử dụng";
    case 4:
      return "Đang sử dụng";
    case 5:
      return "Sửa chữa";
    case 6:
      return "Bảo dưỡng";
    case 7:
      return "Mất";
    case 8:
      return "Hỏng";
    case 9:
      return "Thanh lý";
    case 10:
      return "Hủy";

    default:
      return null;
  }
}

export const getDateString = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let dateString = `${year}-`
  if (month < 10) {
    dateString += `0${month}-`
  } else {
    dateString += `${month}-`
  }
  if (day < 10) {
    dateString += `0${day}`
  } else {
    dateString += day
  }

  return dateString
}

export const getPeriod = (startTimestamp, endTimestamp) => {
  const period = {}
  let currentTimestamp = startTimestamp
  while (currentTimestamp < endTimestamp) {
    const dateString = getDateString(currentTimestamp)
    period[dateString] = {
      color: 'green',
      startingDay: currentTimestamp === startTimestamp,
      selected: true,
    }
    currentTimestamp += 24 * 60 * 60 * 1000
  }
  const dateString = getDateString(endTimestamp)
  period[dateString] = {
    color: 'green',
    endingDay: true,
    selected: true,
  }
  return period
}

export const getPercent = (value, total) => {
  if (total !== 0) {
    let result = (value / total) * 100;
    result = result.toFixed(2);
    return result;
  } 
    return 0;
  
}

export const convertDateFormatTo = (date) => {
  const newDate = new Date(`${date.toString().split('GMT')[0]} UTC`).toISOString().split('.')[0];
  return newDate;
}

export const currentDate = () => new Date(`${new Date().toString().split('GMT')[0]} UTC`).toISOString().split('.')[0];

export const currentDateForUpload = () => {
  let date = `${  new Date().getDate()}`; // Current Date
  let month = `${  new Date().getMonth() + 1}`; // Current Month
  const year = new Date().getFullYear(); // Current Year
  let hours = `${  new Date().getHours()}`; // Current Hours
  let min = `${  new Date().getMinutes()}`; // Current Minutes
  let sec = `${  new Date().getSeconds()}`; // Current Seconds

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (date.length < 2) {
    date = `0${date}`;
  }
  if (hours.length < 2) {
    hours = `0${hours}`;
  }
  if (min.length < 2) {
    min = `0${min}`;
  }

  if (sec.length < 2) {
    sec = `0${sec}`;
  }

  return `${year}${month}${date}_${hours}${min}${sec}`;
};

export const getDateFromLastMonth = () => {
  const x = new Date();
  x.setMonth(x.getMonth()-1);
  return convertDateFormatTo(x);
}

export const getLinkFile = (res, fileName) => res ? `\\${  res.result[res.result
      .findIndex(e => e.includes(fileName))].split('\\').slice(-2).join('\\')}` : ''

export const countNumberOfExitsTotal = (items) => {
  let count = 0;
  items.forEach(e => {
    if (e.chieuDiChuyen === "Ra") {
      count += 1;
    }
  });
  return count;
}

export const countNumberOfEntriesTotal = (items) => {
  let count = 0;
  items.forEach(e => {
    if (e.chieuDiChuyen === "Vào") {
      count += 1;
    }
  });
  return count;
}

export const countNumberOfExitsInDay = (items, day) => {
  let count = 0;
  items.forEach(e => {
    const itemDay = convertTimeFormatToLocaleDate(e.ngayDiChuyen);
    if (e.chieuDiChuyen === "Ra" && itemDay === day) {
      count += 1;
    }
  });
  return count;
}

export const countNumberOfEntriesInDay = (items, day) => {
  let count = 0;
  items.forEach(e => {
    const itemDay = convertTimeFormatToLocaleDate(e.ngayDiChuyen);
    if (e.chieuDiChuyen === "Vào" && itemDay === day) {
      count += 1;
    }
  });
  return count;
}

export const getDates = (startDate, endDate, jump) => {
  const dates = [];
      let currentdate = startDate;
      const addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentdate <= endDate) {
    dates.push(convertFormatDate(currentdate));
    currentdate = addDays.call(currentdate, jump);
  }

  return dates;
}

export const convertFormatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getUTCDate()  }/${  newDate.getMonth() + 1}`;
}

export const convertDateToIOSString = (date) => {
  const dt = convertDateFormatTo(moment(date,"DD, MM YYYY"));
  return dt;
}
export const convertTimeToIOSString = (time) => {
  const dt = (moment(time).format().toISOString());
  return dt;
}

export const addYearToDate = (date, num) => {
  if (date && num != 0) {
    const number = convertDateFormatTo(moment(date,"DD, MM YYYY"));
    const d = new Date(number);
      const year = d.getFullYear() + Number(num);
      const month = d.getMonth() + 1;
      const day = d.getDate();
      
      const c = `${day  }/${ month  }/${ year}`;
      return c;
  }
  return null;
}