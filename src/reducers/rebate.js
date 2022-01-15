import { handleActions } from "redux-actions";


const initialState = {};

export default handleActions(
    {
        REQUEST_BANNER_ACTION(state, action) {
            return initialState;
        },
        REQUEST_MSG_ACTION(state, action) {
            return initialState;
        },
    },
    initialState
);
