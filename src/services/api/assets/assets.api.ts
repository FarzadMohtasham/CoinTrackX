import axios, {AxiosResponse} from "axios"
import {
    AssetHistoryInterval,
    AssetName,
    getAssetHistoryResponse,
    getAssetResponse,
    getAssetsResponse
} from "@typings/type/Assets.api.type.ts";

const axiosInstance = axios.create({
    baseURL: 'https://api.coincap.io/v2/assets/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    }
})

export const getAssets = async (): Promise<getAssetsResponse | null> => {
    const response: getAssetsResponse = {
        data: null,
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get('')
        response.data = data.data
    } catch (e: any) {
        throw new Error(e.message)
    }

    return response.data
}

export const getAsset = async (assetName: AssetName): Promise<getAssetsResponse> => {
    const response: getAssetResponse = {
        data: null,
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get(assetName || 'bitcoin', {
            headers: {
                Accept: 'application/json',
            },
        })
        response.data = data.data
    } catch (e: any) {
        throw new Error(e.message)
    }

    return response.data as AxiosResponse
}

type HistoryLength = number | 0

export const getAssetHistory = async (assetName: AssetName | string, interval: AssetHistoryInterval = 'd1', historyLength: HistoryLength): Promise<getAssetHistoryResponse | null> => {
    const response: getAssetHistoryResponse = {
        data: null,
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get(assetName + '/history?interval=' + interval)
        const historyData = data.data

        if (historyData.length >= 1 && historyLength <= historyData.length) {
            response.data = historyData.slice(historyData.length - historyLength, historyData.length)
        } else {
            response.data = historyData
        }
    } catch (e: any) {
        throw new Error(e.message)
    }

    return response.data
}


type getAssetMarketsT = {
    data: AxiosResponse | null;
    error: any;
}

export const getAssetMarket = async (assetName: AssetName): Promise<getAssetMarketsT> => {
    const response: getAssetMarketsT = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axios.get(assetName + '/markets', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.data = data
    } catch (e) {
        response.error = e
    }

    return response
}