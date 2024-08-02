import { render, screen } from '@/Libs/Utils/test-utils';
import Badge from '@/Components/UI/Stuff/Badge';

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

   it('should not be any icon in the dom when iconSrc is null', () => {
      render(<Badge iconSrc={null}>Badge</Badge>);

      const images = screen.queryAllByRole('img');
      images.forEach((img) => {
         expect(img).not.toHaveClass('icon-left');
         expect(img).not.toHaveClass('icon-right');
      });
   });
});
