import {AssetName} from '@typings/Assets.api.type.ts'
import {assetList} from '@data/assetsList.ts'
import creditCardPatternsData from '@data/cardProviderPatterns.data.ts'
import {CardNumberProvider} from "@typings/component-types/CardNumberInput.type.ts";

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

export function amountToBeFixed(toBeFixedAmount: number) {
    switch (true) {
        case toBeFixedAmount < 0.00001:
            return toBeFixedAmount.toFixed(7)
        case toBeFixedAmount < 0.0001:
            return toBeFixedAmount.toFixed(6)
        case toBeFixedAmount < 0.001:
            return toBeFixedAmount.toFixed(5)
        case toBeFixedAmount < 0.01:
            return toBeFixedAmount.toFixed(4)
        case toBeFixedAmount < 0.1:
            return toBeFixedAmount.toFixed(3)
        case toBeFixedAmount <= 1 || toBeFixedAmount >= 1:
            return toBeFixedAmount.toFixed(2)
        default:
            return ''
    }
}

export const formatCardNumber = (val: string): string => {
    if (!val) return ''
    return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export const checkCardProvider = (cardNumber: string): CardNumberProvider | '' => {
    let result: CardNumberProvider | '' = ''

    for (const [provider, pattern] of Object.entries(creditCardPatternsData)) {
        if (pattern.test(cardNumber)) {
            console.log(pattern.test(cardNumber))
            result = provider as CardNumberProvider
        }
    }

    return result
}






