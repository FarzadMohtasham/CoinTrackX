import { toast } from 'react-hot-toast';
import Icon from '@components/ui/stuff/Icon.tsx';

export default function onSuccessCopyHandler(text = 'Copied!') {
   toast.success(text, {
      icon: <Icon iconSrc={'copy.svg'} width={'25px'} />,
   });
}
