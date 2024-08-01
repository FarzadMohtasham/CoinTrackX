import { render, screen } from '@/Libs/Utils/test-utils';
import Button from '@/Components/UI/Stuff/Button';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
   test('value to be in the button', () => {
      render(<Button>test button</Button>);
      const buttonElement = screen.getByText(/test button/i); // Corrected the typo here
      expect(buttonElement).toBeInTheDocument();
   });

   test('should be disabled with we pass disabled prop with value true', () => {
      render(<Button disabled>hello world</Button>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
   });

   it('should not be disabled when we don\t pass disabled prop', () => {
      render(<Button>Hello world</Button>);

      const buttonElement = screen.getByRole('button');
      expect(buttonElement).not.toBeDisabled();
   });

   it('should run onClickHandler when click on button(not disabled)', async () => {
      const onClickMock = jest.fn();

      render(<Button onClickHandler={onClickMock}>Click on me</Button>);

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).not.toBeDisabled();

      const user = userEvent.setup();
      await user.click(buttonElement);

      expect(onClickMock).toHaveBeenCalled();
   });

   it('should not run onClickHandler when click on button(disabled)', async () => {
      const onClickMock = jest.fn();

      render(
         <Button onClickHandler={onClickMock} disabled>
            Click on me
         </Button>,
      );

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeDisabled();

      const user = userEvent.setup();
      await user.click(buttonElement);

      expect(onClickMock).not.toHaveBeenCalled();
   });

   it('should not be called when button isLoading prop is true', async () => {
      const onClickFn = jest.fn();

      render(
         <Button onClickHandler={onClickFn} isLoading>
            Im loading, do not disturb
         </Button>,
      );

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeDisabled();

      const user = userEvent.setup();
      await user.click(buttonElement);

      expect(onClickFn).not.toHaveBeenCalled();
   });

   it('should be called when button isLoading prop is false', async () => {
      const onClickFn = jest.fn();

      render(
         <Button onClickHandler={onClickFn} isLoading={false}>
            Im not loading, you can disturb
         </Button>,
      );

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).not.toBeDisabled();

      const user = userEvent.setup();
      await user.click(buttonElement);

      expect(onClickFn).toHaveBeenCalled();
   });

   it('should icon be in the left of button text', async () => {
      render(
         <Button icon={'dummySrc'} iconDir="left">
            Left Icon Btn
         </Button>,
      );
      const leftIconElement = await screen.findByRole('img');
      expect(leftIconElement).toHaveClass('left-icon');
      expect(leftIconElement).not.toHaveClass('right-icon');
   });

   it('should icon be in the left of button text', async () => {
      render(
         <Button icon={'dummySrc'} iconDir="right">
            Right Icon Btn
         </Button>,
      );
      const leftIconElement = await screen.findByRole('img');
      expect(leftIconElement).toHaveClass('right-icon');
      expect(leftIconElement).not.toHaveClass('left-icon');
   });

   it('Should Not icon be present in the button', async () => {
      render(
         <Button icon={''} iconDir="left">
            Right Icon Btn
         </Button>,
      );
      const leftIconElement = screen.queryByRole('img');
      expect(leftIconElement).not.toBeInTheDocument();
   });
});
