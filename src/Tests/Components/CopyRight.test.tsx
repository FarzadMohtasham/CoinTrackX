import { render, screen } from '@/Libs/Utils/testUtilities';
import CopyRight from '@Components/UI/Stuff/CopyRight';

const date = new Date();

describe('CopyRight component', () => {
   it('should output copyRight text with current year', () => {
      render(<CopyRight />);
      screen.getByText(`Copyright ${date.getFullYear()} © CoinTrackX`, {
         exact: false,
      });
   });
});
