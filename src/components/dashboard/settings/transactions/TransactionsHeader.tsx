import { useDisclosure } from '@chakra-ui/react';

import Button from '@/components/ui/stuff/Button';
import Heading from '@/components/ui/stuff/Heading';
import TransactionModal from './TransactionModal';

export default function TransactionsHeader() {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <div className="w-full flex justify-between items-center">
         <Heading tagName="h4" fontWeight="bold">
            Portfolio Transactions
         </Heading>

         <Button onClickHandler={onOpen} variant="black" outline>
            Add New
         </Button>

         <TransactionModal isOpen={isOpen} onClose={onClose} type="new" />
      </div>
   );
}
