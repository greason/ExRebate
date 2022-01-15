import App from "@/containers/app";
import Main from "@/containers/pages/main";
import Manager from "@/containers/pages/manager";
import React from "react";
import { IndexRoute, Route } from "react-router";

export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Main} />
            <Route path="/manager" component={Manager} />
        </Route>
    );
};
