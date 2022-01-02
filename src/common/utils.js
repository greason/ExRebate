import { BigNumber } from "bignumber.js";
import moment from "moment";

export function formatFloat(value, digit = 2) {
    return parseFloat(value.toFixed(digit));
}

export function formatThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}

export function formatTransactions(value) {
    if (value > 100000) {
        return `${(parseFloat(value) / 1000000).toFixed(2)}M`;
    } else if (value > 1000) {
        return `${(parseFloat(value) / 1000).toFixed(2)}K`;
    } else {
        return value;
    }
}

export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

export function formatDateTime(value) {
    return moment(value).format('YYYY-MM-DD hh:mm:ss')
}

export function formatTimeDiff(value, locale = "zh", forSecond = false) {
    let seconds = 0;
    if (forSecond) {
        seconds = value;
    } else {
        seconds = moment().diff(moment(value), "seconds");
    }

    let day = Math.floor(seconds / (24 * 60 * 60));
    let hour_seconds = seconds % (24 * 60 * 60);
    let hour = Math.floor(hour_seconds / (60 * 60));
    let minute_seconds = hour_seconds % (60 * 60);
    let minute = Math.floor(minute_seconds / 60);
    let second = minute_seconds % 60;

    if (day) {
        if (locale === "zh") {
            return `${day}天${hour}小时以前`;
        } else {
            return `${day} day${day > 1 ? "s" : ""} ${hour} hour${
                hour > 1 ? "s" : ""
            } ago`;
        }
    }

    if (hour) {
        if (locale === "zh") {
            return `${hour}小时${minute}分钟以前`;
        } else {
            return `${hour} hour${hour > 1 ? "s" : ""} ${minute} min${
                minute > 1 ? "s" : ""
            } ago`;
        }
    }

    if (minute) {
        if (locale === "zh") {
            return `${minute}分钟${second}秒以前`;
        } else {
            return `${minute} min${minute > 1 ? "s" : ""} ${second} sec${
                second > 1 ? "s" : ""
            } ago`;
        }
    }

    if (locale === "zh") {
        return `${second}秒以前`;
    } else {
        return `${second} sec${second > 1 ? "s" : ""} ago`;
    }
}

export function formatDateByDay(timestamp, locale = "zh", abstract = false) {
    let date = moment(timestamp * 1000);
    let now = moment();

    let days = Math.floor((now - date) / (24 * 3600 * 1000));

    if (days < 1) {
        let hours = Math.floor((now - date) / (3600 * 1000));

        if (hours < 1) {
            let min = Math.floor((now - date) / (60 * 1000));
            if (min < 0) {
                min = 0;
            }

            if (locale === "zh") {
                return `${min} 分钟前`;
            } else {
                return `${min} mins ago`;
            }
        } else {
            if (locale === "zh") {
                return `${hours} 小时前`;
            } else {
                return `${hours} hours ago`;
            }
        }
    } else if (days < 30) {
        if (locale === "zh") {
            return `${days} 天前`;
        } else {
            return `${days} days ago`;
        }
    } else {
        if (abstract) {
            return date.format("YYYY-MM-DD HH:mm:ss");
        } else {
            return date.format("YYYY-MM-DD");
        }
    }
}

export function formatAddress(address, start = 0, end = 0) {
    return `${address.substr(0, start)}...${address.substr(
        address.length - end,
        end
    )}`;
}

export function toNumberStr(num) {
    const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
}

export function formatAccuracy(value, decimal = 18) {
    return new BigNumber(value) / new BigNumber(10).pow(decimal);
}

export function reverseAccuracy(value, decimal = 18) {
    return new BigNumber(value) * new BigNumber(10).pow(decimal);
}
