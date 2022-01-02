import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import common from "./common";
import ui from "./ui";

const rootReducer = combineReducers({
    ui,
    common,
    routing,
});

export default rootReducer;
