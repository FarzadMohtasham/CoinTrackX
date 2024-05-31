import {useState} from 'react'
import {styled} from 'styled-components'
import {useNavigate} from 'react-router-dom'

import Input from '@components/ui/Input-Fields/InputField.input.tsx'
import Button from '@components/ui/Button.tsx'
import TopMovers from '@components/ui/TopMovers.tsx'

const PricesContainer = styled.div`
  padding: 3.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .portfolio-summary {
    margin-bottom: 2.4rem;
  }
`

const PricesWrapper = styled.div`
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .left-col {
    flex-grow: 1;
  }

  .right-col {
    display: flex;
    gap: 1rem;
  }
`

const TopMoversWrapper = styled.div`

`

import { Textarea } from "@/components/ui/textarea.tsx"

export default function Prices() {
    const [search, setSearch] = useState<string>('')
    const [watchlistIsActive, setWatchlistIsActive] = useState<boolean>(false)

    const navigate = useNavigate()

    const watchlistBtnHandler = () => {
        setWatchlistIsActive(!watchlistIsActive)
    }

    const portfolioBtnHandler = () => {
        navigate('/dashboard/assets-portfolio')
    }

    return (
        <PricesContainer>
            <TopMoversWrapper>
                <TopMovers/>
            </TopMoversWrapper>

            <PricesWrapper>
                <SearchBar>
                    <div className={'left-col'}>
                        <Input place_holder={'Search crypto'}
                               icon_src={'search-gray.svg'}
                               focus_icon_src={'search-gray-active.svg'}
                               on_change_handler={value => setSearch(value)}/>
                    </div>
                    <div className={'right-col'}>
                        {
                            watchlistIsActive ?
                                <Button icon={'watchlist-purple.svg'}
                                        borderRadius={'md'}
                                        on_click_handler={watchlistBtnHandler}
                                        btnType={'primary'}
                                        outline>
                                    Watchlist
                                </Button>
                                :
                                <Button icon={'watchlist-gray.svg'}
                                        borderRadius={'md'}
                                        on_click_handler={watchlistBtnHandler}
                                        btnType={'gray'}
                                        outline>
                                    Watchlist
                                </Button>
                        }
                        <Button icon={'portfolio-purple.svg'}
                                borderRadius={'md'}
                                on_click_handler={portfolioBtnHandler}
                                outline>
                            Portfolio
                        </Button>
                    </div>
                </SearchBar>
            </PricesWrapper>

            
        </PricesContainer>
    )
}