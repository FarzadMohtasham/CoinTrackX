import { useEffect, useReducer, useState } from 'react';
import Select from '@/components/ui/stuff/Select';
import toast from 'react-hot-toast';
import {
   Transaction,
   TransactionPortfolio,
} from '@/libs/typings/Transaction.type';
import {
   ReducerAction,
   TransactionModalProps,
} from '@/libs/typings/TransactionModal.type';
import {
   Input,
   InputGroup,
   InputLeftElement,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Textarea,
} from '@chakra-ui/react';
import { assetNamesWithSymbols } from '@/data/assetsList';
import { SelectMenuItem } from '@/libs/typings/components/Select.type';
import { AssetName } from '@/libs/typings/Assets.api.type';
import Button from '@/components/ui/stuff/Button';
import Icon from '@/components/ui/stuff/Icon';
import { format } from 'date-fns-tz';
import { addTransactionMutation } from '@/queries/transactions/addTransaction.mutation';
import { useInvalidateQuery } from '@/libs/hooks/useInvalidateQuery';
import { getObjectKeyByValue } from '@/libs/utils/helpers';
import { updateTransactionMutation } from '@/queries/transactions/updateTransaction.mutation';

const reducerFn = (state: Transaction, action: ReducerAction): Transaction => {
   switch (action.type) {
      case 'setType':
         return {
            ...state,
            type: action.payload,
         };
      case 'setAsset':
         return {
            ...state,
            asset: action.payload,
         };
      case 'setPair':
         return {
            ...state,
            pair: action.payload,
         };
      case 'setAmount':
         return {
            ...state,
            amount: action.payload,
         };
      case 'setPrice':
         return {
            ...state,
            price: action.payload,
         };
      case 'setFee':
         return {
            ...state,
            fee: action.payload,
         };
      case 'setFeeCurrency':
         return {
            ...state,
            fee_currency: action.payload,
         };
      case 'setNotes':
         return {
            ...state,
            notes: action.payload,
         };
      case 'setDeductFromUSD':
         return {
            ...state,
            deduct_from_usd: action.payload,
         };
      case 'setTime':
         return {
            ...state,
            time: action.payload,
         };
      case 'setPortfolio':
         return {
            ...state,
            portfolio: action.payload,
         };
      case 'reset':
         return transactionReducerInitial;
      default:
         return state;
   }
};

const transactionReducerInitial: Transaction = {
   type: 'buy',
   asset: 'bitcoin',
   pair: 'USD',
   amount: 0,
   price: 0,
   fee: 0,
   fee_currency: 'USD',
   notes: '',
   deduct_from_usd: false,
   time: '',
   portfolio: 'Default',
};

export default function TransactionModal(props: TransactionModalProps) {
   const { type: transactionType, isOpen, onClose, initialTransaction } = props;

   // ---------- States ----------
   const [transactionState, transactionDispatch] = useReducer(
      reducerFn,
      transactionType === 'edit'
         ? initialTransaction
         : transactionReducerInitial,
   );
   const [assets, setAssets] = useState<SelectMenuItem[]>([]);

   // ---------- Queries ----------
   const invalidateTransactionsQuery = useInvalidateQuery(['getTransactions']);

   const {
      mutateAsync: transactionAddNewMutate,
      isPending: addNewTransactionIsPending,
   } = addTransactionMutation(transactionState, {
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         toast.success('Transaction Submitted successfully');
         invalidateTransactionsQuery();
      },
   });

   const {
      mutateAsync: transactionUpdateMutate,
      isPending: transactionUpdateIsPending,
   } = updateTransactionMutation(transactionState.id || 0, transactionState, {
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         toast.success('Transaction updated');
         invalidateTransactionsQuery();
      },
   });

   // ---------- Handlers ----------
   const onTypeChange = (transactionType: Transaction['type']) => {
      transactionDispatch({
         payload: transactionType,
         type: 'setType',
      });
   };

   const onAmountChange = (event: any) => {
      transactionDispatch({
         payload: event.target.value,
         type: 'setAmount',
      });
   };

   const onPortfolioChange = (val: TransactionPortfolio) => {
      transactionDispatch({
         payload: val,
         type: 'setPortfolio',
      });
   };

   const onAssetChange = (val: AssetName) => {
      transactionDispatch({
         payload: val,
         type: 'setAsset',
      });
   };

   const onDateChange = (event: any) => {
      const timestamp = event.timeStamp;
      const date = new Date(timestamp);

      const timestamptz = format(date, "yyyy-MM-dd'T'HH:mm:ssXXX", {
         timeZone: 'UTC',
      });

      transactionDispatch({
         payload: timestamptz,
         type: 'setTime',
      });
   };

   const onPriceChange = (event: any) => {
      transactionDispatch({
         payload: event.target.value,
         type: 'setPrice',
      });
   };

   const onFeeChange = (event: any) => {
      transactionDispatch({
         payload: event.target.value,
         type: 'setFee',
      });
   };

   const onFeeCurrencyChange = (event: any) => {
      transactionDispatch({
         payload: event.target.value,
         type: 'setFeeCurrency',
      });
   };

   const onNotesChange = (event: any) => {
      transactionDispatch({
         payload: event.target.value,
         type: 'setNotes',
      });
   };

   const onSaveClickHandler = async () => {
      switch (transactionType) {
         case 'new':
            await transactionAddNewMutate();
            break;
         case 'edit':
            await transactionUpdateMutate();
            break;
         default:
            toast.error('Something went wrong, Please try again');
            throw new Error('Unknown transactionType');
      }
   };

   // ---------- Hooks ----------
   useEffect(() => {
      const list = Object.entries(assetNamesWithSymbols);
      setAssets(() =>
         list.map(([key, value], i: number) => {
            return {
               default: i === 0,
               iconSrc: `crypto/${value}.svg`,
               name: key,
               value: value,
            };
         }),
      );
   }, []);

   const headerTitle =
      transactionType === 'edit' ? 'Edit Transaction' : 'Add new transaction';

   const selectedTransactionAsset: SelectMenuItem | null =
      transactionType === 'edit'
         ? {
              default: false,
              iconSrc: `/crypto/${transactionState.asset}.svg`,
              name:
                 getObjectKeyByValue(
                    assetNamesWithSymbols,
                    initialTransaction.asset,
                 ) || '',
              value: initialTransaction.asset,
           }
         : null;

   return (
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>{headerTitle}</ModalHeader>
            <ModalCloseButton />

            <ModalBody className="flex flex-col gap-4">
               <div className="row buy-sell flex justify-between gap-3">
                  <button
                     className="w-full flex items-center justify-center gap-2 py-2 px-5 border-gray-300 border-2 rounded-full"
                     onClick={() => onTypeChange('buy')}
                  >
                     <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${transactionState.type === 'buy' ? 'bg-green-500' : 'bg-gray-300'}`}
                     />
                     <span
                        className={`font-medium transition-all duration-300 ${transactionState.type === 'buy' ? 'text-green-500' : ''}`}
                     >
                        Buy
                     </span>
                  </button>

                  <button
                     className="w-full flex items-center justify-center gap-2 py-2 px-5 border-gray-300 border-2 rounded-full"
                     onClick={() => onTypeChange('sell')}
                  >
                     <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${transactionState.type === 'sell' ? 'bg-red-500' : 'bg-gray-300'}`}
                     />
                     <span
                        className={`font-medium transition-all duration-300 ${transactionState.type === 'sell' ? 'text-red-500' : ''}`}
                     >
                        Sell
                     </span>
                  </button>
               </div>

               <div className="row portfolio">
                  <span className="text-md mb-1 block uppercase">
                     Portfolio
                  </span>
                  <Select
                     items={[
                        {
                           default: true,
                           iconSrc: '',
                           name: 'Default',
                           value: 'Default',
                        },
                     ]}
                     itemSelectSetter={onPortfolioChange}
                  />
               </div>

               <div className="row asset">
                  <span className="text-md mb-1 block uppercase">Asset</span>
                  <Select
                     items={assets}
                     itemSelectSetter={onAssetChange}
                     defaultSelectedItem={selectedTransactionAsset}
                     hasIcon
                  />
               </div>

               <div className="row date-time gap-4">
                  <span className="text-md mb-1 block uppercase">Date</span>
                  <Input
                     placeholder="Select Date and Time"
                     size="md"
                     type="datetime-local"
                     borderWidth={'2px'}
                     borderColor={'var(--color-black-50)'}
                     focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                     height={'50px'}
                     borderRadius={'12px'}
                     onChange={onDateChange}
                  />
               </div>

               <div className="row amount-price flex gap-4 justify-between items-center">
                  <div className="amount w-full">
                     <span className="text-md mb-1 block uppercase">
                        Amount
                     </span>
                     <InputGroup>
                        <InputLeftElement
                           pointerEvents="none"
                           color="gray.300"
                           fontSize="1.2em"
                           height={'100%'}
                        >
                           <Icon
                              width="20px"
                              iconSrc={`/crypto/${transactionState.asset}.svg`}
                           />
                        </InputLeftElement>
                        <Input
                           placeholder="Amount"
                           value={transactionState.amount}
                           onChange={onAmountChange}
                           borderWidth={'2px'}
                           borderColor={'var(--color-black-50)'}
                           focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                           height={'50px'}
                           borderRadius={'12px'}
                        />
                     </InputGroup>
                  </div>

                  <div className="price w-full">
                     <span className="text-md mb-1 block uppercase">Price</span>
                     <InputGroup>
                        <InputLeftElement
                           pointerEvents="none"
                           color="gray.300"
                           fontSize="1.2em"
                           height={'100%'}
                        >
                           $
                        </InputLeftElement>
                        <Input
                           placeholder="Amount"
                           value={transactionState.price}
                           onChange={onPriceChange}
                           borderWidth={'2px'}
                           borderColor={'var(--color-black-50)'}
                           focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                           height={'50px'}
                           borderRadius={'12px'}
                        />
                     </InputGroup>
                  </div>
               </div>

               <div className="row fee flex gap-4 justify-between items-center">
                  <div className="fee-amount w-full">
                     <span className="text-md mb-1 block uppercase">
                        Fee Amount
                     </span>
                     <InputGroup>
                        <InputLeftElement
                           pointerEvents="none"
                           color="gray.300"
                           fontSize="1.2em"
                           height={'100%'}
                        >
                           $
                        </InputLeftElement>
                        <Input
                           placeholder="Fee Amount"
                           value={transactionState.fee}
                           onChange={onFeeChange}
                           borderWidth={'2px'}
                           borderColor={'var(--color-black-50)'}
                           focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                           height={'50px'}
                           borderRadius={'12px'}
                        />
                     </InputGroup>
                  </div>

                  <div className="fee-currency w-full">
                     <span className="text-md mb-1 block uppercase">
                        Fee Currency
                     </span>
                     <Input
                        placeholder="Fee Currency"
                        value={transactionState.fee_currency}
                        onChange={onFeeCurrencyChange}
                        borderWidth={'2px'}
                        borderColor={'var(--color-black-50)'}
                        focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                        height={'50px'}
                        borderRadius={'12px'}
                        disabled
                     />
                  </div>
               </div>

               <div className="time w-full">
                  <span className="text-md mb-1 block uppercase">Notes</span>
                  <Textarea
                     value={transactionState.notes}
                     onChange={onNotesChange}
                     placeholder="Enter any notes if you wish to write!"
                     size="sm"
                     borderWidth={'2px'}
                     borderColor={'var(--color-black-50)'}
                     focusBorderColor={'rgba(14, 6, 55, 0.10)'}
                     height={'50px'}
                     borderRadius={'12px'}
                     fontSize={'large'}
                  />
               </div>
            </ModalBody>

            <ModalFooter className="flex gap-4 justify-between">
               <Button
                  variant="black"
                  isLoading={
                     addNewTransactionIsPending || transactionUpdateIsPending
                  }
                  disabled={
                     addNewTransactionIsPending || transactionUpdateIsPending
                  }
                  onClickHandler={onSaveClickHandler}
                  expanded
               >
                  Save
               </Button>
               <Button
                  onClickHandler={onClose}
                  variant="black"
                  outline
                  expanded
               >
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}
