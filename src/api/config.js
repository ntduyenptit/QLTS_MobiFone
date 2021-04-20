
// define the api
export const baseUrl = 'https://qlts-server.mobifonernd.vn/api/';
export const headerWithoutToken = ({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});
export const headers = (token) => ({
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json',
  Accept: 'application/json'
});
export const endPoint = ({
  login: 'TokenAuth/Authenticate',
  getAllToChucTheoNguoiDung: 'services/app/LookupTable/GetAllToChucTheoNguoiDung',
  getAllTrangThaiTaiSan: 'services/app/LookupTable/GetAllTrangThaiTaiSan',
  getAllNhaCungCap: 'services/app/LookupTable/GetAllNhaCungCap',
  getAllTinhTrangMaSuDungTaiSan: 'services/app/LookupTable/GetAllTinhTrangMaSuDungTaiSan'
});

export const screens = ({
  qlts: 'qlts',
  
});