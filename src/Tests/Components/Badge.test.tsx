import { render, screen } from '@utils/testUtils.tsx';

import Badge from '@components/ui/stuff/Badge.tsx';

describe('Name of the group', () => {
   it('should render children text in the document', () => {
      render(<Badge>Badge</Badge>);
      screen.getByText(/Badge/i);
   });

   it('should img be in the left of children content', () => {
      render(
         <Badge iconSrc={'arrow-up.svg'} iconDir="left">
            Badge
         </Badge>,
      );

      const badgeImgEl = screen.getByRole('img');
      expect(badgeImgEl).toHaveClass('left-icon');
   });

   it('should img be in the right of children content', () => {
      render(
         <Badge iconSrc={'arrow-up.svg'} iconDir="right">
            Badge
         </Badge>,
      );

      const badgeImgEl = screen.getByRole('img');
      expect(badgeImgEl).toHaveClass('right-icon');
   });

   it('should not be any icon in the dom when iconSrc is null', async () => {
      render(<Badge iconSrc={null}>Badge</Badge>);

      const leftIcon = await screen.queryByAltText('left-icon');
      const RightIcon = await screen.queryByAltText('right-icon');

      expect(leftIcon).not.toBeInTheDocument();
      expect(RightIcon).not.toBeInTheDocument();
   });

   it('should not be any icon in the dom when iconSrc is empty string', async () => {
      render(<Badge iconSrc={''}>Badge</Badge>);

      const leftIcon = await screen.queryByAltText('left-icon');
      const RightIcon = await screen.queryByAltText('right-icon');

      expect(leftIcon).not.toBeInTheDocument();
      expect(RightIcon).not.toBeInTheDocument();
   });
});
