import { render, screen } from '@utils/testUtils.tsx';

import CopyRight from '@components/ui/stuff/CopyRight.tsx';

const date = new Date();

describe('CopyRight component', () => {
   it('should output copyRight text with current year', () => {
      render(<CopyRight />);
      screen.getByText(`Copyright ${date.getFullYear()} © CoinTrackX`, {
         exact: false,
      });
   });
});
