import { types } from "@/actions";
import { fork } from "redux-saga/effects";
import { request } from "./common";

function* requestBannerAction() {
    yield request(types.REQUEST_BANNER, "api/rebate/getBanner", "get");
}

function* requestMsgAction() {
    yield request(types.REQUEST_MSG, "api/rebate/getMsg", "get");
}

export default function* () {
    yield fork(requestBannerAction);
    yield fork(requestMsgAction);
}
