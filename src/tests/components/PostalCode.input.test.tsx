import { render, screen } from '@/libs/utils/testUtils';
import PostalCodeInput from '@/components/ui/inputFields/PostalCode.input';
import userEvent from '@testing-library/user-event';

describe('Postal Code component', () => {
   it('should value change when typed to "12345"', async () => {
      render(
         <PostalCodeInput
            postalErrorMsgSetterFn={() => {}}
            postalSetterFn={() => {}}
         />,
      );

      const inputEl = await screen.findByRole('postalcode-input');

      expect(inputEl).toBeInTheDocument();
      await userEvent.type(inputEl, '12345');
      expect(inputEl).toHaveValue('12345');
   });

   it('should have initial value after rendering', async () => {
      render(
         <PostalCodeInput
            postalErrorMsgSetterFn={() => {}}
            postalSetterFn={() => {}}
            initialValue="123"
         />,
      );

      const inputEl = await screen.findByRole('postalcode-input');

      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveValue('123');
   });

   it('should not accept value more than 3 digits', async () => {
      render(
         <PostalCodeInput
            postalErrorMsgSetterFn={() => {}}
            postalSetterFn={() => {}}
            maxLength={3}
         />,
      );

      const inputEl = await screen.findByRole('postalcode-input');

      expect(inputEl).toBeInTheDocument();
      await userEvent.type(inputEl, '12345');
      expect(inputEl).toHaveValue('123');
   });

   it('should be disabled when "disabled" prop passed to component', async () => {
      render(
         <PostalCodeInput
            postalErrorMsgSetterFn={() => {}}
            postalSetterFn={() => {}}
            disabled
         />,
      );

      const inputEl = await screen.findByRole('postalcode-input');

      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toBeDisabled();
   });

   it('should element be found by placeholder', async () => {
      render(
         <PostalCodeInput
            postalErrorMsgSetterFn={() => {}}
            postalSetterFn={() => {}}
            placeholder="im placeholder"
         />,
      );

      const inputEl = await screen.findByPlaceholderText('im placeholder');

      expect(inputEl).toBeInTheDocument();
   });
});
