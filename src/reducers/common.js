import { handleActions } from "redux-actions";


const initialState = {};

export default handleActions(
    {
        TEST_ACTION(state, action) {
            return initialState;
        },
    },
    initialState
);
