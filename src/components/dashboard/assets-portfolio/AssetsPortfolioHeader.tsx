import { Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function AssetsPortfolioHeader() {
   return (
      <div className="assets-portfolio-header-container">
         <div className="w-full flex flex-row items-center content-between">
            <Heading className="flex-grow">Assets</Heading>
            <Link to={'/dashboard/transactions'}>
               <Button>Add Transaction</Button>
            </Link>
         </div>
      </div>
   );
}
