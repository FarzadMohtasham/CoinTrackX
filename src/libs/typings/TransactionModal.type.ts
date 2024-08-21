import { Transaction } from './Transaction.type';

type EditTransactionModalProps = {
   type: 'edit';
   isOpen: boolean;
   onClose: () => void;
   initialTransaction: Transaction;
};

type NewTransactionModalProps = {
   type: 'new';
   isOpen: boolean;
   onClose: () => void;
   initialTransaction?: Transaction;
};

export type TransactionModalProps =
   | EditTransactionModalProps
   | NewTransactionModalProps;

// ///////////////////////////////////////////////

export type ReducerAction =
   | { type: 'setType'; payload: Transaction['type'] }
   | { type: 'setAsset'; payload: Transaction['asset'] }
   | { type: 'setPair'; payload: Transaction['pair'] }
   | { type: 'setAmount'; payload: Transaction['amount'] }
   | { type: 'setPrice'; payload: Transaction['price'] }
   | { type: 'setFee'; payload: Transaction['fee'] }
   | {
        type: 'setFeeCurrency';
        payload: Transaction['fee_currency'];
     }
   | { type: 'setNotes'; payload: Transaction['notes'] }
   | {
        type: 'setDeductFromUSD';
        payload: Transaction['deduct_from_usd'];
     }
   | { type: 'setTime'; payload: Transaction['time'] }
   | {
        type: 'setPortfolio';
        payload: Transaction['portfolio'];
     };
