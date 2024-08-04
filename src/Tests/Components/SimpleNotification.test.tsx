import { render, screen } from '@/Libs/Utils/testUtils.tsx';
import userEvent from '@testing-library/user-event';

import SimpleNotification from '@Components/UI/Notifications/Simple-Notification.notif.tsx';
import { NotificationOptions } from '@Typings/Components/Notification.type.ts';

const date = new Date();

describe('Testing content of notifications', () => {
   it('should have message & title text in the document', async () => {
      const notifOptions: NotificationOptions = {
         id: 1,
         title: 'notif title',
         message: 'notif message',
         createdAt: date.getDate(),
         type: 'success',
      };
      render(<SimpleNotification options={notifOptions} />);

      const titleContentEl = await screen.findByText(
         notifOptions.title as string,
      );
      const messageContentEl = await screen.findByText(
         notifOptions.message as string,
      );

      expect(titleContentEl).toBeInTheDocument();
      expect(messageContentEl).toBeInTheDocument();
   });
});

describe('SimpleNotification functionality', () => {
   it('should be deleted from dom when closed', async () => {
      const notifOptions: NotificationOptions = {
         id: 1,
         title: 'notif title',
         message: 'notif message',
         createdAt: date.getDate(),
         type: 'success',
         closable: true,
      };
      const { container } = render(
         <SimpleNotification options={notifOptions} />,
      );
      const notifContainerEl = container.querySelector('div');
      const closeNotifEl = container.querySelector('.close-icon');
      const user = userEvent.setup();

      expect(notifContainerEl).toBeInTheDocument();
      expect(closeNotifEl).toBeInTheDocument();

      if (closeNotifEl) {
         await user.click(closeNotifEl);
         expect(notifContainerEl).not.toBeInTheDocument();
         expect(closeNotifEl).not.toBeInTheDocument();
      } else {
         throw new Error('closeNotifEl is not in the dom tree');
      }
   });
});
