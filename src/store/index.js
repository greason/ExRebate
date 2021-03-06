import rootReducer from "@/reducers";
import sagas from "@/sagas";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

export default function configure(initialState, history) {
    const middleware = [routerMiddleware(history)];

    const sagaMiddleware = createSagaMiddleware();

    middleware.push(sagaMiddleware);

    if (process.env.NODE_ENV === "development") {
        middleware.push(createLogger());
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );

    sagas.map((saga) => sagaMiddleware.run(saga));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextReducer = require("../reducers");
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
