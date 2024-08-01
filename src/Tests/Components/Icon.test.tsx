import { render, screen } from '@/Libs/Utils/test-utils';
import Icon from '@/Components/UI/Stuff/Icon';
import userEvent from '@testing-library/user-event';

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
