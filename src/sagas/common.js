import { types } from "@/actions";
import { _delete, _get, _post, _postData, _put } from "@/api";
import configs from "@/common/configs";
import _ from "lodash";
import { fork, put, take } from "redux-saga/effects";

function* sendRequestStatus(type, request, data, userInfo) {
    yield put({
        type,
        payload: {
            type,
            request,
            data,
            userInfo,
        },
    });
}

function* requestStart(request, data, userInfo) {
    yield sendRequestStatus(types.REQUEST_START, request, data, userInfo);
}

function* requestSuccessful(request, data, userInfo) {
    yield sendRequestStatus(types.REQUEST_SUCCESSFUL, request, data, userInfo);
}

function* requestFailed(request, data, userInfo) {
    yield sendRequestStatus(types.REQUEST_FAILED, request, data, userInfo);
}

export function* request(type, url, method = "get") {
    const methods = {
        post: _post,
        get: _get,
        post_data: _postData,
        put: _put,
        delete: _delete,
    };
    while (true) {
        const action = yield take(type);
        const payload = action.payload || {};
        const userInfo = _.cloneDeep(payload._userInfo);
        delete payload.noauth;
        delete payload._userInfo;

        payload.nonce = Date.now();

        yield requestStart(type);
        const res = yield methods[method](url, payload);

        if (
            !_.isEmpty(res) &&
            typeof res === "object" &&
            res.code === configs.ret.OK
        ) {
            yield put({ type: `${type}_DONE`, payload: res.data, meta: action.meta });
            yield requestSuccessful(type, res.data, userInfo);
        } else {
            yield put({ type: `${type}_FAILED`, data: res, meta: action.meta });
            yield requestFailed(type, res, userInfo);
        }
    }
}

function* requestTestAction() {
    yield request(types.TEST_ACTION, "/swap/gain-all-tokens", "post");
}

export default function* () {
    yield fork(requestTestAction);
}
