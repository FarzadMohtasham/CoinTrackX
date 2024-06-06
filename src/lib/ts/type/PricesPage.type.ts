export type PaginationRowProps = {
    nextPageHandler: () => void;
    previousPageHandler: () => void;
    getCanNextPage: boolean;
    getCanPreviousPage: boolean;
    totalPageCount: number;
}