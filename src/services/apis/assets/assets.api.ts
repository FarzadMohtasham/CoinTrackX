import { AxiosResponse } from 'axios';
import { coincapAxiosInstance } from '@configs/axios/coincap.axios';

import {
   Asset,
   AssetHistoryInterval,
   AssetMarketProps,
   AssetName,
   AssetsApiResponse,
} from '@typings/Assets.api.type.ts';

/**
 * The provided TypeScript code defines functions to fetch assets and a specific asset using Axios in
 * an asynchronous manner.
 * @returns The `getAssets` function returns a Promise that resolves to an array of Asset objects or
 * null. The `getAsset` function returns a Promise that resolves to an AssetsApiResponse object.
 */
export const getAssets = async (): Promise<Asset[] | null> => {
   let assets: Asset[] | null = null;

   try {
      const { data }: AxiosResponse = await coincapAxiosInstance.get('/assets');
      assets = data.data;
   } catch (e: any) {
      throw new Error(e.message);
   } finally {
      return assets;
   }
};

/**
 * The function `getAsset` retrieves asset data using Axios and returns it in a structured format.
 * @param {AssetName} assetName - The `assetName` parameter is the name of the asset for which you want
 * to retrieve data. It is of type `AssetName`.
 * @returns The `getAsset` function returns a Promise that resolves to an `AssetsApiResponse` object.
 */
export const getAsset = async (
   assetName: AssetName,
): Promise<AssetsApiResponse> => {
   const response: AssetsApiResponse = {
      data: null,
   };

   try {
      const { data }: AxiosResponse = await coincapAxiosInstance.get(
         `/assets/${assetName}`,
         {
            headers: {
               Accept: 'application/json',
            },
         },
      );
      response.data = data.data;
   } catch (e: any) {
      throw new Error(e.message);
   } finally {
      return response.data as AssetsApiResponse;
   }
};

/**
 * This TypeScript function retrieves asset history data based on the specified parameters and returns
 * a subset of the data based on the history length.
 * @param {AssetName | string} assetName - The `assetName` parameter represents the name of the asset
 * for which you want to retrieve the historical data. It can be of type `AssetName` or a string.
 * @param {AssetHistoryInterval} [interval=d1] - The `interval` parameter in the `getAssetHistory`
 * function specifies the interval at which you want to retrieve the asset's historical data. It has a
 * default value of `'d1'`, which stands for daily interval. You can change this parameter to specify a
 * different interval such as `'h1
 * @param {HistoryLength} historyLength - The `historyLength` parameter in the `getAssetHistory`
 * function represents the number of historical data points you want to retrieve for a specific asset.
 * It determines how many data points from the asset's history will be included in the response.
 * @returns The function `getAssetHistory` returns a Promise that resolves to an `AssetsApiResponse`
 * object or `null`.
 */
type HistoryLength = number | 0;

export const getAssetHistory = async (
   assetName: AssetName | string,
   interval: AssetHistoryInterval = 'd1',
   historyLength: HistoryLength,
): Promise<AssetsApiResponse | null> => {
   const response: AssetsApiResponse = {
      data: null,
   };

   try {
      const { data }: AxiosResponse = await coincapAxiosInstance.get(
         `/assets/${assetName}/history`,
         {
            params: {
               interval: interval,
            },
         },
      );
      const historyData = data.data;

      if (historyData.length >= 1 && historyLength <= historyData.length) {
         response.data = historyData.slice(
            historyData.length - historyLength,
            historyData.length,
         );
      } else {
         response.data = historyData;
      }
   } catch (e: any) {
      throw new Error(e.message);
   } finally {
      return response.data;
   }
};

/**
 * This function retrieves asset markets data based on the provided asset name.
 * @param {AssetName | string} assetName - The `assetName` parameter in the `getAssetMarkets` function
 * is of type `AssetName` or `string`. It represents the name of the asset for which you want to
 * retrieve market data.
 * @returns The `getAssetMarkets` function returns a Promise that resolves to an array of
 * `AssetMarketProps` objects or `null`.
 */
export const getAssetMarkets = async (
   assetName: AssetName | string,
): Promise<AssetMarketProps[] | null> => {
   let assetMarkets = [];

   try {
      const { data }: AxiosResponse = await coincapAxiosInstance.get(
         '/markets',
         {
            headers: {
               'Content-Type': 'application/json',
            },
            params: {
               baseSymbol: assetName,
            },
         },
      );
      assetMarkets = data.data;
   } catch (e: any) {
      throw new Error(e.message);
   } finally {
      return assetMarkets;
   }
};
