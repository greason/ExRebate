import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { browserHistory, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configs from "./common/configs";
import en_US from "./locales/en_US";
import zh_CN from "./locales/zh_CN";
import createRoutes from "./routes";
import configureStore from "./store";
import "./styles/main.less";

let initState, messages;

let locale = localStorage.getItem(configs.storage.locale);
if (!locale) {
    locale = navigator.language.toLocaleLowerCase() === "zh-cn" ? "zh" : "en";
}

switch (locale) {
    case "zh":
        messages = zh_CN;
        break;
    case "en":
        messages = en_US;
        break;
    default:
        messages = zh_CN;
        break;
}

const init = () => {
    const store = configureStore(initState, browserHistory);
    const history = syncHistoryWithStore(browserHistory, store);
    const routes = createRoutes(store);

    ReactDOM.render(
        <IntlProvider locale={locale} messages={messages}>
            <Provider store={store}>
                <ConfigProvider locale={locale === "zh" ? zhCN : ""}>
                    <Router history={history}>{routes}</Router>
                </ConfigProvider>
            </Provider>
        </IntlProvider>,
        document.getElementById("app")
    );
};


init();
