import Big from "big.js"
import { BigNumber } from "ethers"

// token默认精度
export const ERC20_DECIMAL_DIGITS = 18
// 稳定币的默认精度
export const QUOTE_DECIMAL_DIGITS = 6
// ERC20代币在页面上显示时保留的最长小数位
export const ERC20_SHWO_MAX_DIGITS = 8
// 稳定币在页面上显示时保留的最长小数位
export const QUOTE_ASSET_DIGITS = 2

// 格式化千分位的正则
const regexUSLocaleNumber = new RegExp(/\d(?=(\d{3})+$)/g)

// 把整数格式化为千分位形式，参数必须是整数，123456 -> 123,456
export function formatInt(number = "") {
    return number.replace(regexUSLocaleNumber, "$&,")
}

// 格式化数字为字符串
export function formatAsset(number, decimals = 0, showK = true) {
    return formatNumber(number, QUOTE_ASSET_DIGITS, decimals, showK)
}

// 格式化稳定币的数字为字符串，decimals为稳定币的精度
export function formatQuoteAsset(number, decimals = QUOTE_DECIMAL_DIGITS, showK = true) {
    return formatNumber(number, QUOTE_ASSET_DIGITS, decimals, showK)
}

// 格式化ERC20代币的数字为字符串，decimals为代币的精度
export function formatErc20Asset(number, decimals = ERC20_DECIMAL_DIGITS, showK = true) {
    return formatNumber(number, ERC20_SHWO_MAX_DIGITS, decimals, showK)
}

// 格式化数字为可显示的字符串，digits为要保留的最长小数位，decimals为代币的精度
export function formatNumber(val, digits = ERC20_SHWO_MAX_DIGITS, decimals = ERC20_DECIMAL_DIGITS, showK = true) {
    if (!val) return ''
    const num = toNum(val, decimals).toFixed(digits)
    let [n1, n2] = num.split('.')
    if (showK) n1 = formatInt(n1) || '0'
    if (n2) {
        n2 = n2.replace(/0+$/g, '')
    }
    if (n2) {
        n1 = `${n1}.${n2}`
    }
    return n1 || '0'
}

// 数字格式转换逻辑
export function bigNum2Big(val, decimals = ERC20_DECIMAL_DIGITS) {
    return new Big(val.toString()).div(new Big(10).pow(decimals))
}

export function big2BigNum(val, decimals = ERC20_DECIMAL_DIGITS) {
    return BigNumber.from(val.mul(new Big(10).pow(decimals)).toFixed(0))
}

export function BigNum2Decimal(val) {
    return {
        d: val,
    }
}

export function Decimal2BigNum(val) {
    return val.d
}

// 转换为指定类型的数字å
export function toStr(val, decimals = ERC20_DECIMAL_DIGITS) {
    return isStr(val) ? val :
        isNum(val) ? val.toString() :
            isBig(val) ? val.toFixed() :
                isBigNum(val) || isDecimal(val) ? toBig(val, decimals).toFixed() :
                    val.toString()
}

export function toNum(val, decimals = ERC20_DECIMAL_DIGITS) {
    return isStr(val) || isBig(val) ? Number(val) :
        isNum(val) ? val :
            isBigNum(val) || isDecimal(val) ? Number(toBig(val, decimals)) :
                Number(val)
}

export function toBigNum(val, decimals = ERC20_DECIMAL_DIGITS) {
    return isStr(val) || isNum(val) ? big2BigNum(toBig(val), decimals) :
        isBig(val) ? big2BigNum(val, decimals) :
            isBigNum(val) ? val :
                isDecimal(val) ? Decimal2BigNum(val) :
                    BigNumber.from(val)
}

export function toBig(val, decimals = ERC20_DECIMAL_DIGITS) {
    return isStr(val) || isNum(val) ? new Big(val) :
        isBig(val) ? val :
            isBigNum(val) ? bigNum2Big(val, decimals) :
                isDecimal(val) ? bigNum2Big(Decimal2BigNum(val), decimals) :
                    new Big(val)
}

export function toDecimal(val, decimals = ERC20_DECIMAL_DIGITS) {
    return isStr(val) || isNum(val) || isBig(val) ? BigNum2Decimal(toBigNum(val, decimals)) :
        isBigNum(val) ? BigNum2Decimal(val) :
            val
}

// 判断是否为指定类型的数字
export const isStr = (val) => {
    return typeof val === 'string'
}
export const isNum = (val) => {
    return typeof val === 'number'
}
export const isBigNum = (val) => {
    return val instanceof BigNumber
}
export const isBig = (val) => {
    return val instanceof Big
}
export const isDecimal = (val) => {
    return typeof val === 'object' && val.d instanceof BigNumber
}


export const showAddressStr = (address) => {
    if (!address) return ''
    const len = 12, rightLen = (len - 2) / 2, leftLen = (len - rightLen)
    const leftStr = address.substr(0, leftLen), rightStr = address.substr(-rightLen)
    return `${leftStr}...${rightStr}`
}