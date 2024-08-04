import { render, screen } from '@utils/testUtils.tsx';
import userEvent from '@testing-library/user-event';

import Icon from '@components/ui/stuff/Icon.tsx';

describe('Icon ', () => {
   it('should run handler fn when clicked', async () => {
      const onClickHandlerFn = jest.fn();

      render(
         <Icon iconSrc="" width="10px" onClickHandler={onClickHandlerFn} />,
      );
      const iconElement = screen.getByRole('img');
      const user = userEvent.setup();
      await user.click(iconElement);

      expect(onClickHandlerFn).toHaveBeenCalled();
   });
});
