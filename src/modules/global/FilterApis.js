import { endPoint } from '../../api/config';
import { createGetMethod } from '../../api/Apis'

// Đơn vị quản lý
export const getDVQLDataFilter = () => createGetMethod(endPoint.getAllToChucTheoNguoiDung)

  // Loại tài sản
  export const getLTSDataFilter =  () => createGetMethod(endPoint.getAllTrangThaiTaiSan)

  // Nhà cung cấp
  export const getNCCDataFilter =  () => createGetMethod(endPoint.getAllNhaCungCap)

  // Mã sử dụng
  export const getMSDDataFilter =  () => createGetMethod(endPoint.getAllTinhTrangMaSuDungTaiSan)

  // Tình trạng sử dụng
  export const getTTSDDataFilter = () => createGetMethod(endPoint.getAllTrangThaiSuDung)