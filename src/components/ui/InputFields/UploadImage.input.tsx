import { ChangeEventHandler, ReactNode, useRef } from 'react';
import { styled } from 'styled-components';

type UploadImageInputProps = {
   setImageFile: ChangeEventHandler<HTMLInputElement>;
   children: ReactNode;
};

const UploadImageInputContainer = styled.div`
   .file-input {
      display: none;
   }

   .custom-file-upload {
      display: inline-block;
      padding: 11px 24px;
      background-color: white;
      border-radius: 8px;
      border: 1px solid var(--color-primary-200);
      color: var(--color-primary-800);
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease;

      &:hover {
         background-color: var(--color-primary-100);
      }
   }
`;

export default function UploadImageInput({
   setImageFile,
   children,
}: UploadImageInputProps) {
   const inputRef = useRef<HTMLInputElement>(null);

   const handleLabelClick = () => {
      inputRef?.current?.click();
   };

   return (
      <UploadImageInputContainer>
         <label className={'custom-file-upload'} onClick={handleLabelClick}>
            {children}
         </label>
         <input
            type="file"
            accept="image/*"
            onChange={setImageFile}
            ref={inputRef}
            className={'file-input'}
         />
      </UploadImageInputContainer>
   );
}
