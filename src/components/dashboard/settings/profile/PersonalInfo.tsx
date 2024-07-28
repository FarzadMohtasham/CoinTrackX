import { styled } from 'styled-components';
import Heading from '@/Components/UI/Stuff/Heading';
import Input from '@/Components/UI/InputFields/InputField.input';
import { Dispatch, useEffect, useReducer } from 'react';
import Button from '@/Components/UI/Stuff/Button';
import Select from '@/Components/UI/Stuff/Select';
import countryOfResidenceList from '@/Data/countryOfResidence.data';

const PersonalInfoContainer = styled.div`
   border-radius: 8px;
   border: 1px solid var(--color-black-100);
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;

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

type PersonalInfoReducerState = {
   changed: boolean;
   value: string;
};

type PersonalInfoReducerStates = {
   firstName: PersonalInfoReducerState;
   lastName: PersonalInfoReducerState;
   dateOfBirth: PersonalInfoReducerState;
   countryOfResidence: PersonalInfoReducerState;
};

type PersonalInfoReducerActions =
   | {
        type: 'setFirstName';
        payload: {
           value: string;
           reset: boolean;
        };
     }
   | {
        type: 'setLastName';
        payload: {
           value: string;
           reset: boolean;
        };
     }
   | {
        type: 'setDateOfBirth';
        payload: {
           value: string;
           reset: boolean;
        };
     }
   | {
        type: 'setCountryOfResidence';
        payload: {
           value: string;
           reset: boolean;
        };
     };

const personalInfoReducer = (
   state: PersonalInfoReducerStates,
   action: PersonalInfoReducerActions,
) => {
   const { value, reset } = action.payload;

   switch (action.type) {
      case 'setFirstName':
         return {
            ...state,
            firstName: {
               changed: !reset,
               value: value,
            },
         };
      case 'setLastName':
         return {
            ...state,
            lastName: {
               changed: !reset,
               value: value,
            },
         };
      case 'setDateOfBirth':
         return {
            ...state,
            dateOfBirth: {
               changed: !reset,
               value: value,
            },
         };
      case 'setCountryOfResidence':
         return {
            ...state,
            countryOfResidence: {
               changed: !reset,
               value: value,
            },
         };
      default:
         return state;
   }
};

export default function PersonalInfo() {
   const defaultValues = {
      firstName: 'John Doe',
      lastName: 'Smith',
      dateOfBirth: '1990-01-01',
      countryOfResidence: 'United States',
   };

   const [personalInfoState, personalInfoDispatch]: [
      PersonalInfoReducerStates,
      Dispatch<PersonalInfoReducerActions>,
   ] = useReducer(personalInfoReducer, {
      firstName: {
         changed: false,
         value: defaultValues.firstName,
      },
      lastName: {
         changed: false,
         value: defaultValues.lastName,
      },
      dateOfBirth: {
         changed: false,
         value: defaultValues.dateOfBirth,
      },
      countryOfResidence: {
         changed: false,
         value: defaultValues.countryOfResidence,
      },
   });

   // Constants
   const showActionButtons =
      personalInfoState.firstName.changed ||
      personalInfoState.lastName.changed ||
      personalInfoState.dateOfBirth.changed ||
      personalInfoState.countryOfResidence.changed;

   // Handlers
   const handleFirstNameChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setFirstName',
         payload: {
            value: inputValue,
            reset: false,
         },
      });

   const handleLastNameChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setLastName',
         payload: {
            value: inputValue,
            reset: false,
         },
      });

   const handleDateOfBirthChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setDateOfBirth',
         payload: {
            value: inputValue,
            reset: false,
         },
      });

   const handleCountryOfResidenceChange = (inputValue: string) =>
      personalInfoDispatch({
         type: 'setCountryOfResidence',
         payload: {
            value: inputValue,
            reset: false,
         },
      });

   const handleResetChangesClick = () => {
      personalInfoDispatch({
         type: 'setFirstName',
         payload: {
            value: defaultValues.firstName,
            reset: true,
         },
      });
      personalInfoDispatch({
         type: 'setLastName',
         payload: {
            value: defaultValues.lastName,
            reset: true,
         },
      });
      personalInfoDispatch({
         type: 'setDateOfBirth',
         payload: {
            value: defaultValues.dateOfBirth,
            reset: true,
         },
      });
      personalInfoDispatch({
         type: 'setCountryOfResidence',
         payload: {
            value: defaultValues.countryOfResidence,
            reset: true,
         },
      });
   };

   useEffect(() => {
      handleResetChangesClick();
   }, []);

   return (
      <PersonalInfoContainer>
         <div className="content-wrapper">
            <LeftCol>
               <Heading headingType={'h6'}>Personal info</Heading>
               <span className="description">Manage your information</span>
            </LeftCol>

            <RightCol>
               <div className="name-inputs-wrapper">
                  <Input
                     inputValue={personalInfoState.firstName.value}
                     label={'First Name'}
                     onChangeHandler={handleFirstNameChange}
                     placeHolder={'First Name'}
                     iconSrc={null}
                  />
                  <Input
                     inputValue={personalInfoState.lastName.value}
                     label={'Last Name'}
                     onChangeHandler={handleLastNameChange}
                     placeHolder={'Last Name'}
                     iconSrc={null}
                  />
               </div>

               <div className="date-of-birth-input-wrapper">
                  <span></span>
                  <Input
                     inputValue={personalInfoState.dateOfBirth.value}
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

         {showActionButtons && (
            <div className="actions-wrapper">
               <Button>Save Changes</Button>

               <Button onClickHandler={handleResetChangesClick} outline>
                  Reset Changes
               </Button>
            </div>
         )}
      </PersonalInfoContainer>
   );
}
