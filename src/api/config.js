
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
  getAllTinhTrangMaSuDungTaiSan: 'services/app/LookupTable/GetAllTinhTrangMaSuDungTaiSan',
  getToanBoTaiSan: 'services/app/ToanBoTaiSan/GetAll',
});

// Quản lý màn hình
export const screens = ({
  quan_ly_tai_san: 'Quản lý tài sản',
  // quản lý đầu đọc
  quan_ly_dau_doc: 'Quản lý đầu đọc',
  quan_ly_dau_doc_di_dong: 'Quản lý đầu đọc di đông',
  quan_ly_dau_doc_co_dinh: 'Quản lý đầu đọc cố định',
  giam_sat_tai_san: 'Giám sát tài sản',
  theo_doi_ket_noi_thiet_bi: 'Theo dõi kết nối thiết bị',
  quan_ly_kiem_ke_tai_san: 'Quản lý kiểm kê tài sản',
  quan_ly_du_tru_mua_sam: 'Quản lý dự trù mua sắm',
  quan_ly_canh_bao: 'Quản lý cảnh báo',
  // quản lý danh mục
  quan_ly_danh_muc: 'Quản lý danh muc',
  quan_ly_nha_cung_cap: 'Quản lý nhà cung cấp',
  quan_ly_vi_tri_dia_ly: 'Quản lý vị trí địa lý',
  quan_ly_loai_tai_san: 'Quản lý loại tài sản',
  quan_ly_don_vi: 'Quản lý đơn vị',
  // báo cáo
  bao_cao: 'Báo cáo',
  bao_cao_nguoi_dung: 'Báo cáo người dùng',
  dat_lich_xuat_bao_cao: 'Đặt lịch xuất báo cáo',
  bao_cao_canh_bao: 'Báo cáo cảnh báo',
  bao_cao_thong_tin_thiet_bi_rfid: 'Báo cáo thông tin thiết bị RFID',
  bao_cao_thong_tin_tai_san: 'Báo cáo thông tin tài sản',
  // quản lý hệ thống
  quan_ly_he_thong: 'Quản lý hệ thống',
  quan_ly_nguoi_dung: 'Quản lý người dùng',
  quan_ly_phan_quyen: 'Quản lý phân quyền',
  lich_su_nguoi_dung: 'Lịch sử người dùng',
  quan_ly_mail_server: 'Quản lý Mail, Server'
});

// Quản lý tabs
export const tabs = ({
  toan_bo_tai_san: 'Toàn bộ TS',
  tai_san_mat: 'TS mất',
  tai_san_hong: 'TS hỏng',
  tai_san_thanh_ly: 'TS thanh lý',
})

// Quản lý icon
export const icons = ({
  iconQuanlytaisan: "home",
  iconQuanlydaudoc: "barcode",
  iconGiamsattaisan: "window-restore",
  iconKiemketaisan: "server",
  iconDutrumuasam: "shopping-cart",
  iconQuanlycanhbao: "bell",
  iconBaocao: "file",
  iconQuanlydanhmuc: "folder-open",
  iconQuanlyhethong: "cogs",
});

// Quản lý menu
export const drawerData = [
  {
    name: screens.quan_ly_tai_san,
    icon: icons.iconQuanlytaisan,
  },
  {
    name: screens.quan_ly_dau_doc,
    icon: icons.iconQuanlydaudoc,
    children: [
      {
        name: screens.quan_ly_dau_doc_di_dong,
      },
      {
        name: screens.quan_ly_dau_doc_co_dinh,
      }
    ]
  },
  {
    name: screens.giam_sat_tai_san,
    icon: icons.iconGiamsattaisan,
    children: [
      {
        name: screens.giam_sat_tai_san,

      },
      {
        name: screens.theo_doi_ket_noi_thiet_bi,
      }
    ]
  },
  {
    name: screens.quan_ly_kiem_ke_tai_san,
    icon: icons.iconKiemketaisan,
  },
  {
    name: screens.quan_ly_du_tru_mua_sam,
    icon: icons.iconDutrumuasam,
  },
  {
    name: screens.quan_ly_canh_bao,
    icon: icons.iconQuanlycanhbao,
  },
  {
    name: screens.bao_cao,
    icon: icons.iconBaocao,
    children: [
      {
        name: screens.bao_cao_nguoi_dung,
      },
      {
        name: screens.bao_cao_canh_bao,
      },
      {
        name: screens.dat_lich_xuat_bao_cao,
      },
      {
        name: screens.bao_cao_thong_tin_thiet_bi_rfid,
      },
      {
        name: screens.bao_cao_thong_tin_tai_san,
      },
    ]
  },
  {
    name: screens.quan_ly_danh_muc,
    icon: icons.iconQuanlydanhmuc,
    children: [
      {
        name: screens.quan_ly_nha_cung_cap,
      },
      {
        name: screens.quan_ly_vi_tri_dia_ly,
      },
      {
        name: screens.quan_ly_loai_tai_san,
      },
      {
        name: screens.quan_ly_don_vi,
      }
    ]
  },
  {
    name: screens.quan_ly_he_thong,
    icon: icons.iconQuanlyhethong,
    children: [
      {
        name: screens.quan_ly_nguoi_dung,
      },
      {
        name: screens.quan_ly_phan_quyen,
      },
      {
        name: screens.lich_su_nguoi_dung,
      },
      {
        name: screens.quan_ly_mail_server,
      }
    ]
  },
];