import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from '@chakra-ui/react';

type CopyToClipboardProps = {
   children: ReactNode;
   tooltipText: string;
   onCopyClick?: () => void;
   textToCopy?: string;
};

const CopyToClipboardWrapper = styled.div.attrs({
   className: 'copy-to-clipboard-wrapper',
})`
   cursor: pointer;
`;

export default function CopyToClipboard(props: CopyToClipboardProps) {
   const { children, tooltipText, textToCopy, onCopyClick = () => {} } = props;

   return (
      <CopyToClipboardWrapper>
         <Tooltip label={tooltipText} placement="auto">
            <>
               <ReactCopyToClipboard
                  text={textToCopy || String(children)}
                  onCopy={onCopyClick}
               >
                  <span>{children}</span>
               </ReactCopyToClipboard>
            </>
         </Tooltip>
      </CopyToClipboardWrapper>
   );
}
