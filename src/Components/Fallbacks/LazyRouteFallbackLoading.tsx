import { styled } from 'styled-components';

const LoadingContainer = styled.div`
   display: grid;
   height: 100vh;
   width: 100vw;
   place-content: center;

   .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
`;

export default function LazyRouteFallbackLoading() {
   return (
      <LoadingContainer>
         <div className="wrapper">
            <h5>Loading...</h5>
         </div>
      </LoadingContainer>
   );
}
