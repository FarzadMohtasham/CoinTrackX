export type AssetPriceTable = {
    name: {
        name: string;
        symbol: string;
        logoSrc: string;
        id: string;
    };
    price: string;
    marketCap: string;
    circulatingSupply: string;
    changePercent: string;
    last24H: string;
    watchList: boolean;
}