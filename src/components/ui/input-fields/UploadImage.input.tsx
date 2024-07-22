import { ChangeEventHandler } from 'react';
import { styled } from 'styled-components';

type UploadImageInputProps = {
  setImageFile: ChangeEventHandler<HTMLInputElement>;
}

const UploadImageInputContainer = styled.div`
    
`;

export default function UploadImageInput({ setImageFile }: UploadImageInputProps) {

  return (
    <UploadImageInputContainer>
      <input type="file" accept="image/*" onChange={setImageFile} />
    </UploadImageInputContainer>
  );
}