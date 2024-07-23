import { styled } from 'styled-components';
import Input from '@components/ui/input-fields/InputField.input.tsx';
import { Dispatch, SetStateAction } from 'react';

type UpdateContactInfoProps = {
  setDisplayName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  displayNameErrorMsg: string;
  emailErrorMsg: string;
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

    span.error-msg {
        color: red;
        font-size: var(--font-size-body-md);
        margin-top: 5px;
        display: block;
        text-align: left;
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
               hasError={props.displayNameErrorMsg.length > 0}
               onChangeHandler={props.setDisplayName} />
        <span className={'error-msg'}>{props.displayNameErrorMsg}</span>
      </FieldWrapper>

      <FieldWrapper>
        <span className="label email-label">
          Email
        </span>
        <Input initialValue={''}
               iconSrc={null}
               placeHolder={'Please enter display name'}
               hasError={props.emailErrorMsg.length > 0}
               onChangeHandler={props.setEmail} />
        <span className={'error-msg'}>{props.emailErrorMsg}</span>
      </FieldWrapper>
    </UploadProfilePhotoContainer>
  );
}