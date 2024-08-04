import { toast } from 'react-hot-toast';

import Icon from '@Components/UI/Stuff/Icon.tsx';

export default function onSuccessCopyHandler(text = 'Copied!') {
   toast.success(text, {
      icon: <Icon iconSrc={'copy.svg'} width={'25px'} />,
   });
}
