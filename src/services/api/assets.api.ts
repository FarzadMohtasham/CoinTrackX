import axios, {AxiosResponse} from "axios"
import {
    AssetHistoryInterval,
    AssetName,
    getAssetHistoryResponse,
    getAssetResponse,
    getAssetsResponse
} from "@ts/type/Assets.api.type.ts";

const axiosInstance = axios.create({
    baseURL: 'https://api.coincap.io/v2/assets/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    }
})

export const getAssets = async (): Promise<getAssetsResponse> => {
    const response: getAssetsResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get('')
        response.data = data
    } catch (e) {
        response.error = e
    }

    return response
}

export const getAsset = async (assetName: AssetName) => {
    const response: getAssetResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get(assetName, {
            headers: {
                Accept: 'application/json',
            },
        })
        response.data = data.data
    } catch (e) {
        response.error = e
    }

    return response
}

export const getAssetHistory = async (assetName: AssetName, interval: AssetHistoryInterval = 'd1') => {
    const response: getAssetHistoryResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axiosInstance.get(assetName + '/history?interval=' + interval)
        response.data = data.data
    } catch (e) {
        response.error = e
    }

    return response
}


type getAssetMarketsT = {
    data: AxiosResponse | null;
    error: any;
}

export const getAssetMarket = async (assetName: AssetName) => {
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