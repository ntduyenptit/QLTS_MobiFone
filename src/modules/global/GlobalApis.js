import { endPoint, tabs } from '../../api/config';
import { createGetMethod } from '../../api/Apis'
  
  // Giám sát tài sản dashboard
  export const getGSTSDashboard = (parameters) => {
    const { datas, startdate, enddate } = parameters;
    if (datas && datas.length > 0) {
        let url;
        url = `${endPoint.getLichsuRavaoAngten}?`;
        if (startdate) {
            url += `StartDate=${encodeURIComponent(`${startdate}`)}&`;
        }

        if (enddate) {
            url += `EndDate=${encodeURIComponent(`${enddate}`)}&`;
        }
    
        datas.forEach(e => {
          if (e.id) {
            url += `BoPhanId=${encodeURIComponent(`${e.id}`)}&`;
          } else {
            url += `BoPhanId=${encodeURIComponent(`${e}`)}&`;
          }
        });
    
        url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
        url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
        url += `MaxResultCount=${encodeURIComponent(`${100}`)}`;

        return createGetMethod(url);
      }
      return null;
  }

  export const GetToanBoTaiSanData = (parameters) => {
    const { datas, tab } = parameters;
    if (datas && datas.length > 0) {
        let url;
        switch (tab) {
          case tabs.toan_bo_tai_san:
            url = `${endPoint.getToanBoTaiSan}?`;
            break;
          case tabs.tai_san_thanh_ly:
            url = `${endPoint.getTaiSanThanhLy}?`;
            break;
          case tabs.tai_san_mat:
            url = `${endPoint.getTaiSanMat}?`;
            break;
          case tabs.tai_san_hong:
            url = `${endPoint.getTaiSanHong}?`;
            break;
          case tabs.tai_san_dang_su_dung:
            url = `${endPoint.getTaiSanDangSuDung}?`;
            break;
          case tabs.tai_san_chua_su_dung:
            url = `${endPoint.getTaiSanChuaSuDung}?`;
            break;
          case tabs.tai_san_sua_chua_bao_duong:
            url = `${endPoint.getTaiSanSuaChuaBaoDuong}?`;
            break;
          case tabs.tai_san_huy:
            url = `${endPoint.getTaiSanHuy}?`;
            break;
          case tabs.bao_hong_mat_tai_san:
            url = `${endPoint.getAllKhaibaoHongmat}?`;
            break;
          default:
            url = `${endPoint.getToanBoTaiSan}?`;
            break;
        }

        if (tab === tabs.tai_san_dang_su_dung || tab === tabs.tai_san_chua_su_dung) {
            datas.forEach(e => {
              url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
            });
          } else {
            datas.forEach(e => {
                url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
          }

          url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
          url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
          url += `MaxResultCount=${encodeURIComponent(`${1}`)}`;

          return createGetMethod(url);
    }
    return null
  }