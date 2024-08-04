import { render, screen } from '@/Libs/Utils/testUtils.tsx';
import userEvent from '@testing-library/user-event';

import CheckboxInput from '@Components/UI/InputFields/Checkbox.input.tsx';

describe('Checkbox input', () => {
   it('should be checked when clicked', async () => {
      const setterFn = jest.fn();
      render(<CheckboxInput label={'checkbox'} checkBoxSetter={setterFn} />);

      const user = userEvent.setup();
      const checkboxEl = screen.queryByAltText('checkbox');

      if (!checkboxEl) {
         throw new Error('checkbox not found in the dom tree!');
      }

      expect(checkboxEl).toBeInTheDocument();
      expect(checkboxEl).not.toBeChecked();

      await user.click(checkboxEl);

      expect(checkboxEl).toBeChecked();
   });

   it('should be checked when defaultValue true passed', () => {
      render(
         <CheckboxInput
            label={'checkbox'}
            checkBoxSetter={() => {}}
            defaultValue={true}
         />,
      );

      const checkboxEl = screen.queryByAltText('checkbox');

      expect(checkboxEl).toBeChecked();
   });
});

describe('Checkbox functionality', () => {
   it('should not be checked when defaultValue false passed', () => {
      render(
         <CheckboxInput
            label={'checkbox'}
            checkBoxSetter={() => {}}
            defaultValue={false}
         />,
      );

      const checkboxEl = screen.queryByAltText('checkbox');

      expect(checkboxEl).not.toBeChecked();
   });

   it('should setter fn be called when component rendered for the first time', async () => {
      const setterFn = jest.fn();
      render(<CheckboxInput label={'checkbox'} checkBoxSetter={setterFn} />);

      const checkboxEl = screen.queryByAltText('checkbox');

      expect(checkboxEl).toBeInTheDocument();

      expect(setterFn).toHaveBeenCalled();
   });

   it('should setter fn be called two times when component rendered for the first time and then clicked', async () => {
      const setterFn = jest.fn();
      render(<CheckboxInput label={'checkbox'} checkBoxSetter={setterFn} />);

      const user = userEvent.setup();
      const checkboxEl = screen.queryByAltText('checkbox');

      if (!checkboxEl) {
         throw new Error('checkbox not found in the dom tree!');
      }

      expect(checkboxEl).toBeInTheDocument();

      await user.click(checkboxEl);

      expect(setterFn).toHaveBeenCalledTimes(2);
   });
});
