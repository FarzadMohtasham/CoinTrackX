import { Dispatch, useEffect, useReducer } from 'react';
import { styled } from 'styled-components';
import Heading from '@components/ui/stuff/Heading.tsx';
import Input from '@components/ui/inputFields/InputField.input.tsx';
import Button from '@components/ui/stuff/Button.tsx';
import Select from '@components/ui/stuff/Select.tsx';

import countryOfResidenceList from '@data/countryOfResidence.data.ts';
import useUserProfile from '@/queries/auth/useUserProfile.query';
import toast from 'react-hot-toast';
import { updateUserProfile } from '@/services/apis/auth/userProfile/updateUserProfile.api';
import { useMutation } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

const PersonalInfoContainer = styled.div`
   border-radius: 8px;
   border: 1px solid var(--color-black-100);
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;

   .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 32px;
   }

   .name-inputs-wrapper {
      display: flex;
      flex-direction: column;

      @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
         flex-direction: row;
      }
   }

   .actions-wrapper {
      display: flex;
      gap: 10px;
   }
`;

const LeftCol = styled.div`
   span.description {
      color: var(--color-black-600);
      font-size: var(--font-size-body-sm);
   }
`;

const RightCol = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   .name-inputs-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 25px;
   }

   .country-of-residence-wrapper {
   }
`;

const ErrorContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   .desc {
      margin-bottom: 20px;
   }
`;

type PersonalInfoReducerState = {
   value: string;
};

type PersonalInfoReducerStates = {
   first_name: PersonalInfoReducerState;
   last_name: PersonalInfoReducerState;
   date_of_birth: PersonalInfoReducerState;
   country_of_residence: PersonalInfoReducerState;
};

type PersonalInfoReducerActions =
   | {
        type: 'setFirstName';
        payload: {
           value: string;
        };
     }
   | {
        type: 'setLastName';
        payload: {
           value: string;
        };
     }
   | {
        type: 'setDateOfBirth';
        payload: {
           value: string;
        };
     }
   | {
        type: 'setCountryOfResidence';
        payload: {
           value: string;
        };
     };

const personalInfoReducer = (
   state: PersonalInfoReducerStates,
   action: PersonalInfoReducerActions,
) => {
   const { value } = action.payload;

   switch (action.type) {
      case 'setFirstName':
         return {
            ...state,
            first_name: {
               value: value,
            },
         };
      case 'setLastName':
         return {
            ...state,
            last_name: {
               value: value,
            },
         };
      case 'setDateOfBirth':
         return {
            ...state,
            date_of_birth: {
               value: value,
            },
         };
      case 'setCountryOfResidence':
         return {
            ...state,
            country_of_residence: {
               value: value,
            },
         };
      default:
         return state;
   }
};

export default function PersonalInfo() {
   const [personalInfoState, personalInfoDispatch]: [
      PersonalInfoReducerStates,
      Dispatch<PersonalInfoReducerActions>,
   ] = useReducer(personalInfoReducer, {
      first_name: {
         value: '',
      },
      last_name: {
         value: '',
      },
      date_of_birth: {
         value: '',
      },
      country_of_residence: {
         value: '',
      },
   });

   let {
      data: userProfile,
      error: userProfileError,
      isLoading: userProfileIsLoading,
      refetch: userProfileRefetch,
   } = useUserProfile();

   const { mutateAsync: mutatePersonalInfo, isPending: mutateIsPending } =
      useMutation({
         mutationFn: async () => {
            const profilePayload: {
               [key: string]: any;
            } = {};

            Object.entries(personalInfoState).forEach(([key, value]) => {
               profilePayload[key] = value.value;
            });

            await updateUserProfile(profilePayload);
         },
         onSuccess: () => {
            toast.success('Personal info updated successfully');
         },
         onError: ({ message }) => {
            toast.error(message);
         },
      });

   // Handlers
   const handleFirstNameChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setFirstName',
         payload: {
            value: inputValue,
         },
      });

   const handleLastNameChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setLastName',
         payload: {
            value: inputValue,
         },
      });

   const handleDateOfBirthChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setDateOfBirth',
         payload: {
            value: inputValue,
         },
      });

   const handleCountryOfResidenceChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setCountryOfResidence',
         payload: {
            value: inputValue,
         },
      });

   const handleSaveChangesClick = async () => {
      await mutatePersonalInfo();
      userProfileRefetch();
   };

   const handleResetChangesClick = () => {
      personalInfoDispatch({
         type: 'setFirstName',
         payload: {
            value: userProfile?.first_name || '',
         },
      });
      personalInfoDispatch({
         type: 'setLastName',
         payload: {
            value: userProfile?.last_name || '',
         },
      });
      personalInfoDispatch({
         type: 'setDateOfBirth',
         payload: {
            value: userProfile?.date_of_birth || '',
         },
      });
      personalInfoDispatch({
         type: 'setCountryOfResidence',
         payload: {
            value: userProfile?.country_of_residence || '',
         },
      });
   };

   useEffect(() => {
      if (!userProfile) return;

      setTimeout(() => {
         handleResetChangesClick();
      }, 0);
   }, [userProfile]);

   if (userProfileIsLoading)
      return <Skeleton count={3} height={'100px'} width={'100%'} />;

   if (userProfileError) {
      return (
         <ErrorContainer>
            <Heading className="error-title">Something went wrong!</Heading>
            <span className="desc">{userProfileError}</span>
            <Button
               disabled={userProfileIsLoading}
               isLoading={userProfileIsLoading}
               onClickHandler={userProfileRefetch}
            >
               Try again
            </Button>
         </ErrorContainer>
      );
   }

   return (
      <PersonalInfoContainer>
         <div className="content-wrapper">
            <LeftCol>
               <Heading tagName={'h6'}>Personal info</Heading>
               <span className="description">Manage your information</span>
            </LeftCol>

            <RightCol>
               <div className="name-inputs-wrapper">
                  <Input
                     inputValue={personalInfoState.first_name.value}
                     label={'First Name'}
                     onChangeHandler={handleFirstNameChange}
                     placeHolder={'First Name'}
                     iconSrc={null}
                  />
                  <Input
                     inputValue={personalInfoState.last_name.value}
                     label={'Last Name'}
                     onChangeHandler={handleLastNameChange}
                     placeHolder={'Last Name'}
                     iconSrc={null}
                  />
               </div>

               <div className="date-of-birth-input-wrapper">
                  <span></span>
                  <Input
                     inputValue={personalInfoState.date_of_birth.value}
                     label={'Date of Birth'}
                     onChangeHandler={handleDateOfBirthChange}
                     placeHolder={'Date of Birth'}
                     iconSrc={null}
                  />
               </div>

               <div className="country-of-residence-wrapper">
                  <Select
                     $menuItems={countryOfResidenceList}
                     $newValueSetter={handleCountryOfResidenceChange}
                     $menuXDirStartPosition="left"
                     $label={'Select your country of residence'}
                     $hasIcon
                     $closeAfterSelect
                  />
               </div>
            </RightCol>
         </div>

         <div className="actions-wrapper">
            <Button
               onClickHandler={handleSaveChangesClick}
               disabled={mutateIsPending}
               isLoading={mutateIsPending}
            >
               Save Changes
            </Button>

            <Button
               onClickHandler={handleResetChangesClick}
               disabled={mutateIsPending}
               outline
            >
               Reset Changes
            </Button>
         </div>
      </PersonalInfoContainer>
   );
}
