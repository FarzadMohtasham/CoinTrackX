import axios, { AxiosResponse } from 'axios';

import {
  Asset,
  AssetHistoryInterval,
  AssetMarketProps,
  AssetName,
  AssetsApiResponse,
} from '@typings/Assets.api.type.ts';

const axiosInstance = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export const getAssets = async (): Promise<Asset[] | null> => {
  let assets: Asset[] | null = null;

  try {
    const { data }: AxiosResponse = await axiosInstance.get('/assets');
    assets = data.data;
  } catch (e: any) {
    throw new Error(e.message);
  }

  return assets;
};

export const getAsset = async (
  assetName: AssetName,
): Promise<AssetsApiResponse> => {
  const response: AssetsApiResponse = {
    data: null,
  };

  try {
    const { data }: AxiosResponse = await axiosInstance.get(
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
  }

  return response.data as AssetsApiResponse;
};

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
    const { data }: AxiosResponse = await axiosInstance.get(
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
  }

  return response.data;
};

export const getAssetMarkets = async (
  assetName: AssetName | string,
): Promise<AssetMarketProps[] | null> => {
  let assetMarkets = [];

  try {
    const { data }: AxiosResponse = await axiosInstance.get('/markets', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        baseSymbol: assetName,
      },
    });
    assetMarkets = data.data;
  } catch (e: any) {
    throw new Error(e.message);
  }

  return assetMarkets;
};
