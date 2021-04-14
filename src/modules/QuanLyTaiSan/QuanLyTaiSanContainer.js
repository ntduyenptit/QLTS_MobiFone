import { compose, withState } from 'recompose';

import QuanLyTaiSan from './QuanLyTaiSan';

export default compose(withState('isExtended', 'setIsExtended', false))(
  QuanLyTaiSan,
);
