import {styled} from 'styled-components'

import Button from '@components/ui/Button.tsx'

import {PaginationRowProps} from '@ts/type/PricesPage.type.ts'
import Icon from "@components/ui/Icon.tsx";
import {useState} from "react";

const PaginationRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function PaginationRow(props: PaginationRowProps) {
    const [pageIndex, setPageIndex] = useState(1)

    const {
        getCanNextPage,
        getCanPreviousPage,
        nextPageHandler,
        previousPageHandler,
        totalPageCount,
    } = props

    const onNextPageHandler = () => {
        nextPageHandler()
        setPageIndex(pageIndex + 1)
    }

    const onPreviousPageHandler = () => {
        previousPageHandler()
        setPageIndex(pageIndex - 1)
    }

    return (
        <PaginationRowContainer>
            <Button btnType={'primary'}
                    on_click_handler={onPreviousPageHandler}
                    disabled={!getCanPreviousPage}>
                <Icon icon_src={'arrow-left.svg'} width={'20rem'}/>
                Previous
            </Button>

            <span>{pageIndex} of {totalPageCount}</span>

            <Button btnType={'primary'}
                    on_click_handler={onNextPageHandler}
                    disabled={!getCanNextPage}>
                Next
                <Icon icon_src={'arrow-right.svg'} width={'20rem'}/>
            </Button>
        </PaginationRowContainer>
    )
}