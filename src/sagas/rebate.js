import { types } from "@/actions";
import { fork } from "redux-saga/effects";
import { request } from "./common";

function* requestBannerAction() {
    yield request(types.REQUEST_BANNER, "api/rebate/getBanner", "get");
}

function* requestMsgAction() {
    yield request(types.REQUEST_MSG, "api/rebate/getMsg", "get");
}

function* requestUpdateBannerAction() {
    yield request(types.REQUEST_UPDATE_BANNER, "api/rebate/updateBanner", "post");
}

function* requestAddNewsAction() {
    yield request(types.REQUEST_ADD_NEWS, "api/rebate/addNews", "post");
}

function* requestUpdateMoreAction() {
    yield request(types.REQUEST_UPDATE_MORE, "api/rebate/updateMore", "post");
}

function* requestJinseListAction() {
    yield request(types.REQUEST_JINSE_LIST, "live/list", "get");
}


export default function* () {
    yield fork(requestBannerAction);
    yield fork(requestMsgAction);
    yield fork(requestUpdateBannerAction);
    yield fork(requestAddNewsAction);
    yield fork(requestUpdateMoreAction);
    yield fork(requestJinseListAction);
}
