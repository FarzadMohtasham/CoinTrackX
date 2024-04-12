import {styled} from "styled-components"

const numbersList = [
    {
        title: '+100 Coin/Token',
        desc: 'supported'
    },
    {
        title: '50+',
        desc: 'countries supported'
    },
    {
        title: '#1 platform',
        desc: 'crypto tracking'
    },
]

const NumbersContainerStyled = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 4.8rem 0;

  /*Very Small devices (landscape phones, 576px and down)*/
  @media (max-width: ${props => props.theme.responsive.md}) {
    flex-direction: column;
    gap: 5rem;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    flex-direction: row;
  }
`

const NumberStyled = styled.div`
  text-align: center;

  .title {
    padding-bottom: .8rem;
    font-weight: 500;
  }

  .desc {
    display: block;
    color: var(--color-black-500);
  }
`

export default function Numbers() {
    return (
        <NumbersContainerStyled>
            {
                numbersList.map((numberItem, index) => {
                    return (
                        <NumberStyled key={numberItem.title + index}>
                            <h3 className={'title'}>
                                {numberItem.title}
                            </h3>
                            <span className={'desc'}>
                                {numberItem.desc}
                            </span>
                        </NumberStyled>
                    )
                })
            }
        </NumbersContainerStyled>
    )
}