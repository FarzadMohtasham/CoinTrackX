import Button from '@/components/ui/stuff/Button';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function AssetsPortfolioHeader() {
   return (
      <div className="assets-portfolio-header-container">
         <div className="flex w-full flex-row content-between items-center">
            <Heading as={'h2'} size={'lg'} className="flex-grow">Assets</Heading>
            <Link to={'/dashboard/transactions'}>
               <Button variant='black' outline>Add Transaction</Button>
            </Link>
         </div>
      </div>
   );
}
