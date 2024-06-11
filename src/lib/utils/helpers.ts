import {AssetName} from '@typings/type/Assets.api.type.ts'
import {assetList} from '@data/assetsList.ts'

export function titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

export function removeLetter(str: string, letterToRemove: string): string {
    return str.split(letterToRemove).join('');
}

export function getCurrentTime() {
    const date = new Date()

    const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
    const min = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
    const sec = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()

    return {hour, min, sec}
}

export function getCurrentTimeFormatted(): string {
    const currentTime = getCurrentTime()
    return `${currentTime.hour}:${currentTime.min}:${currentTime.sec}`
}

export function assetExists(assetName: AssetName) {
    return assetList.findIndex(asset => asset === assetName) >= 1
}