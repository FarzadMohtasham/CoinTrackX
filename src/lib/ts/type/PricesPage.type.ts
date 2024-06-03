import {SetStateAction} from "react";

export type PaginationRowProps = {
    nextPageHandler: () => void;
    previousPageHandler: () => void;
    getCanNextPage: boolean;
    getCanPreviousPage: boolean;
    totalPageCount: number;
}

export type PricesTableProps = {
    searchVal: string;
    setSearch: SetStateAction<any>;
    showOnlyWatchlist: boolean;
}