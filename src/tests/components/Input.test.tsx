import InputField from '@/components/ui/inputFields/InputField.input';
import { render, screen } from '@/libs/utils/testUtils';
import userEvent from '@testing-library/user-event';

describe('Input component', () => {
   it('should user cannot type in input field and click on that', async () => {
      const onChangeFn = jest.fn();
      render(
         <InputField
            onChangeHandler={onChangeFn}
            inputValue="empty"
            placeHolder="You can't type me :)"
            disabled
         />,
      );
      const inputEl = screen.getByPlaceholderText("You can't type me :)");

      await userEvent.click(inputEl);
      await userEvent.type(inputEl, 'this is test');

      expect(onChangeFn).not.toHaveBeenCalledTimes(2);
      expect(inputEl).toHaveValue('empty');
      expect(inputEl).not.toHaveValue('this is test');
   });
});
