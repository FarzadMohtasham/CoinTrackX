import { styled } from 'styled-components';
import Input from '@components/ui/input-fields/InputField.input.tsx';
import { Dispatch, SetStateAction } from 'react';

type UpdateContactInfoProps = {
  setDisplayName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

const UploadProfilePhotoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
`;

const FieldWrapper = styled.div`
    flex-grow: 1;

    span.label {
        margin-bottom: 7px;
        display: block;
        font-size: var(--font-size-body-md);
    }
`;

export default function UpdateContactInfo(props: UpdateContactInfoProps) {

  return (
    <UploadProfilePhotoContainer>
      <FieldWrapper>
        <span className="label display-name-label">
          Display name
        </span>
        <Input initialValue={''}
               iconSrc={null}
               placeHolder={'Please enter display name'}
               onChangeHandler={props.setDisplayName} />
      </FieldWrapper>

      <FieldWrapper>
        <span className="label email-label">
          Email
        </span>
        <Input initialValue={''}
               iconSrc={null}
               placeHolder={'Please enter display name'}
               onChangeHandler={props.setEmail} />
      </FieldWrapper>
    </UploadProfilePhotoContainer>
  );
}