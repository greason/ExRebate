import App from "@/containers/app";
import Guide from "@/containers/pages/guide";
import Main from "@/containers/pages/main";
import React from "react";
import { IndexRoute, Route } from "react-router";

export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Main} />
            <Route path="/exchange" component={Guide} />
        </Route>
    );
};
