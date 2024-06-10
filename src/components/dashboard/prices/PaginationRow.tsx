import {JSX, useState} from 'react'
import {styled} from 'styled-components'

import Button from '@components/ui/stuff/Button.tsx'
import Icon from '@components/ui/stuff/Icon.tsx'

import {PaginationRowProps} from '@typings/type/PricesPage.type.ts'

const PaginationRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function PaginationRow(props: PaginationRowProps): JSX.Element {
    const [pageIndex, setPageIndex] = useState(1)

    const {
        getCanNextPage,
        getCanPreviousPage,
        nextPageHandler,
        previousPageHandler,
        totalPageCount,
    }: PaginationRowProps = props

    const onNextPageHandler = (): void => {
        nextPageHandler()
        setPageIndex(pageIndex + 1)
    }

    const onPreviousPageHandler = (): void => {
        previousPageHandler()
        setPageIndex(pageIndex - 1)
    }

    return (
        <PaginationRowContainer>
            <Button btnType={'primary'}
                    onClickHandler={onPreviousPageHandler}
                    disabled={!getCanPreviousPage}>
                <Icon iconSrc={'arrow-left.svg'} width={'20rem'}/>
                Previous
            </Button>

            <span>{pageIndex} of {totalPageCount}</span>

            <Button btnType={'primary'}
                    onClickHandler={onNextPageHandler}
                    disabled={!getCanNextPage}>
                Next
                <Icon iconSrc={'arrow-right.svg'} width={'20rem'}/>
            </Button>
        </PaginationRowContainer>
    )
}