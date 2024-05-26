import axios, {AxiosResponse} from "axios"
import {AssetName, getAssetHistoryResponse, getAssetResponse, getAssetsResponse} from "@ts/type/Assets.api.type.ts";

const baseURL = 'api.coincap.io/v2'

export const getAssets = async (): Promise<getAssetsResponse> => {
    const response: getAssetsResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axios.get(baseURL + '/assets', {
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

export const getAsset = async () => {
    const response: getAssetResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axios.get(baseURL + '/assets', {
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

export const getAssetHistory = async (assetName: AssetName) => {
    const response: getAssetHistoryResponse = {
        data: null,
        error: null
    }

    try {
        const {data}: AxiosResponse = await axios.get(baseURL + '/assets/' + assetName + '/history', {
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
        const {data}: AxiosResponse = await axios.get(baseURL + '/assets/' + assetName + '/markets', {
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