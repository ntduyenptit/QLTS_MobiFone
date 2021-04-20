/* eslint-disable no-return-await */
import { endPoint } from '../../api/config';
import { createGetMethod } from '../../api/Apis'

// Đơn vị quản lý
export const getDVQLDataFilter = () => {
    return createGetMethod(endPoint.getAllToChucTheoNguoiDung);
}

  // Loại tài sản
  export const getLTSDataFilter =  () => {
      return  createGetMethod(endPoint.getAllTrangThaiTaiSan);
  }

  // Nhà cung cấp
  export const getNCCDataFilter =  () => {
      return  createGetMethod(endPoint.getAllNhaCungCap)
  }

  // Mã sử dụng
  export const getMSDDataFilter =  () => {
      return  createGetMethod(endPoint.getAllTinhTrangMaSuDungTaiSan)
  }