import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import common from "./common";
import ui from "./ui";
import rebate from "./rebate";

const rootReducer = combineReducers({
    ui,
    common,
    routing,
    rebate
});

export default rootReducer;
