let API_PREFIX;

switch (process.env.NODE_ENV) {
    case "development":
        API_PREFIX = "";
        API_PREFIX = "http://0.0.0.0:9242";
        break;
    case "test":
        API_PREFIX = "//test.xxx.com";
        break;
    case "production":
        API_PREFIX = "//prod.xxx.com";
        break;
}

const configs = {
    api: `${API_PREFIX}`,
    storage: {
        locale: "rebate-locale",
    },
    ret: {
        OK: 200,
    },
    status: {
        Idle: 0,
        Handling: 1,
        Successful: 2,
        Failed: 3,
    },
    languages: [
        {
            value: "zh",
            label: "中文(简体)",
        },
        {
            value: "en",
            label: "English",
        },
    ],
    pageSizeOptions: [10, 20, 50, 100],
    regular: {
        number: /^[0-9]+.?[0-9]*$/,
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        mobile: /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
        url: /[a-zA-z]+:\/\/[^\s]*/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        ID: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        github: /^(https?:\/\/)?(www.)?github.com\/([^/]*\/[^/]*)\/(.*)/,
        http: /^(http?:\/\/?(.*))$/,
        https: /^(https?:\/\/?(.*))$/,
        swarm: /^(bzz-raw?:\/\/?(.*))$/,
        ipfs: /^(ipfs:\/\/?.+)/,
    },
};

export default configs;
