import configs from "@/common/configs";
import Frisbee from "frisbee";
import _ from "lodash";

let locale = localStorage.getItem(configs.storage.locale);
if (!locale) {
    locale = navigator.language.toLocaleLowerCase() === "zh-cn" ? "zh" : "en";
}

export const agent = new Frisbee({
    baseURI: configs.api,
    headers: {
        Accept: "application/json",
        Platform: "web",
        locale: locale === "zh" ? "zh-CN" : "en_US",
        "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDIyMjMzNjYsImV4cCI6MTAwMDAwMDE2NDIyMjMzNjZ9.T7mTij9exXMFyobZAqmOD_WvCwDuGkswlb_sK2SUxPY",
    },
});

const error = (e) => {
    let message = e.message;
    if (e instanceof TypeError && e.message === "Network request failed") {
        message =
            locale === "zh"
                ? "网络连接失败，请稍后再试"
                : "Network connection failed";
    }
    return {
        data: {
            errCode: 99999,
        },
        errMsg: message || locale === "zh" ? "未知错误" : "Unknown Error",
    };
};

export async function _get(path, data) {
    try {
        const res = await agent.get(path, {
            body: data,
        });

        if (res.ok) return res.body;
        return error(res.err);
    } catch (e) {
        return error(e);
    }
}

export async function _getElse(baseURI, path, data) {
    try {
        const agentElse = new Frisbee({
            baseURI: baseURI,
            headers: {
                Accept: "application/json",
                Platform: "web",
                locale: locale === "zh" ? "zh-CN" : "en_US",
            },
        });

        const res = await agentElse.get(path, {
            mode: "cors",
            body: data,
        });

        if (res.ok) return res.body;
        return error(res.err);
    } catch (e) {
        return error(e);
    }
}

export async function _post(path, data) {
    try {
        const res = await agent.post(path, {
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        if (res.ok) return res.body;
        return error(res.err);
    } catch (e) {
        return error(e);
    }
}

export async function _postData(url, data) {
    let onProgress;
    if (typeof data.onProgress === "function") {
        onProgress = data.onProgress;
        delete data.onProgress;
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const options = agent.opts;
        const headers = {
            ...options.headers,
            ...agent.headers,
        };
        xhr.open("POST", `${options.baseURI}${url}`);
        _.forEach(headers, (value, key) => {
            xhr.setRequestHeader(key, value);
        });

        xhr.onload = (event) => {
            try {
                return resolve(JSON.parse(event.target.response));
            } catch (e) {
                return reject(e);
            }
        };
        xhr.onerror = reject;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = (event) => {
                onProgress(event.loaded, event.total);
            };

        try {
            const formData = new FormData();
            _.forEach(data, (value, key) => {
                if (key === "files") {
                    _.forEach(value, (file) => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            xhr.send(formData);
        } catch (e) {
            return reject(e);
        }
    });
}

export async function _put(path, data) {
    try {
        const res = await agent.put(path, {
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        if (res.ok) return res.body;
        return error(res.err);
    } catch (e) {
        return error(e);
    }
}

export async function _delete(path, data) {
    try {
        const res = await agent.delete(path, {
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        if (res.ok) return res.body;
        return error(res.err);
    } catch (e) {
        return error(e);
    }
}
