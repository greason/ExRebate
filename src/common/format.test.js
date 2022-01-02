import Big from "big.js"
import { BigNumber } from "ethers"
import {
    formatErc20Asset,
    formatQuoteAsset,
    isBig,
    isBigNum,
    isDecimal,
    isNum,
    isStr,
    toBig,
    toBigNum,
    toDecimal,
    toNum,
    toStr
} from "./format"

const decimals = 18

const NumValue = 1231231234.23456789
const BigValue = new Big(NumValue)
const StrValue = NumValue + ''

const BigNumberValue = BigNumber.from(BigValue.mul(new Big(10).pow(decimals)).toFixed(0))
const DecimalValue = {
    d: BigNumberValue
}
const values = [StrValue, NumValue, BigValue, BigNumberValue, DecimalValue]

test('isStr', () => {
    values.forEach(value => expect(isStr(value)).toBe(value === StrValue))
});

test('isNum', () => {
    values.forEach(value => expect(isNum(value)).toBe(value === NumValue))
});

test('isBigNum', () => {
    values.forEach(value => expect(isBigNum(value)).toBe(value === BigNumberValue))
});

test('isBig', () => {
    values.forEach(value => expect(isBig(value)).toBe(value === BigValue))
});

test('isDecimal', () => {
    values.forEach(value => expect(isDecimal(value)).toBe(value === DecimalValue))
});

test('toStr', () => {
    values.forEach(value => expect(toStr(value, decimals)).toBe(StrValue))
});

test('toNum', () => {
    values.forEach(value => expect(toNum(value, decimals)).toBe(NumValue))
});

test('toBig', () => {
    values.forEach(value => expect(toBig(value, decimals)).toEqual(BigValue))
});

test('toBigNum', () => {
    values.forEach(value => expect(toBigNum(value, decimals)).toEqual(BigNumberValue))
});

test('toDecimal', () => {
    values.forEach(value => expect(toDecimal(value, decimals)).toEqual(DecimalValue))
});

test('formatQuoteAsset', () => {
    values.forEach(value => expect(formatQuoteAsset(value, decimals)).toBe('1,231,231,234.23'))
    expect(formatQuoteAsset('1234234')).toBe('1,234,234')
    expect(formatQuoteAsset('.1234234')).toBe('0.12')
    expect(formatQuoteAsset('45678.123')).toBe('45,678.12')
});

test('formatErc20Asset', () => {
    values.forEach(value => expect(formatErc20Asset(value, decimals)).toBe('1,231,231,234.234568'))
    expect(formatErc20Asset('1234234')).toBe('1,234,234')
    expect(formatErc20Asset('.1234234')).toBe('0.123423')
    expect(formatErc20Asset('45678.123')).toBe('45,678.123')
});