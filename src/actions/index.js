import { createAction } from "redux-actions";

export const types = {
    REQUEST_START: "REQUEST_START",
    REQUEST_SUCCESSFUL: "REQUEST_SUCCESSFUL",
    REQUEST_FAILED: "REQUEST_FAILED",
    RESET: "RESET",
    SHOW_LOADING: "SHOW_LOADING",
    CLEAR_LOADING: "CLEAR_LOADING",
    SHOW_TOAST: "SHOW_TOAST",
    CLEAR_TOAST: "CLEAR_TOAST",

    REQUEST_BANNER: "REQUEST_BANNER",
    REQUEST_MSG: "REQUEST_MSG",
    REQUEST_UPDATE_BANNER: "REQUEST_UPDATE_BANNER",
    REQUEST_ADD_NEWS: "REQUEST_ADD_NEWS",
    REQUEST_UPDATE_MORE: "REQUEST_UPDATE_MORE",

    REQUEST_JINSE_LIST: "REQUEST_JINSE_LIST",
}

export const showLoading = createAction(types.SHOW_LOADING);
export const clearLoading = createAction(types.CLEAR_LOADING);
export const showToast = createAction(types.SHOW_TOAST);
export const clearToast = createAction(types.CLEAR_TOAST);

export const requestBannerAction = createAction(
    types.REQUEST_BANNER,
    null,
    (_, metaData) => {
        return metaData;
    }
);

export const requestMsgAction = createAction(
    types.REQUEST_MSG,
    null,
    (_, metaData) => {
        return metaData;
    }
);
export const requestAddNewsAction = createAction(
    types.REQUEST_ADD_NEWS,
    null,
    (_, metaData) => {
        return metaData;
    }
);
export const requestUpdateMoreAction = createAction(
    types.REQUEST_UPDATE_MORE,
    null,
    (_, metaData) => {
        return metaData;
    }
);
export const requestJinseListAction = createAction(
    types.REQUEST_JINSE_LIST,
    null,
    (_, metaData) => {
        return metaData;
    }
);
