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

    TEST_ACTION: "TEST_ACTION",
}

export const showLoading = createAction(types.SHOW_LOADING);
export const clearLoading = createAction(types.CLEAR_LOADING);
export const showToast = createAction(types.SHOW_TOAST);
export const clearToast = createAction(types.CLEAR_TOAST);

export const requestTestAction = createAction(
    types.TEST_ACTION,
    null,
    (_, metaData) => {
        return metaData;
    }
);
