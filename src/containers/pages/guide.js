import React from "react";
import BasePureLayout from "@/common/base/layout/pure";
import * as actions from "@/actions";

export default class Guide extends BasePureLayout {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.requestTestAction();
    }

    requestDidSuccess(type, data) {
        super.requestDidSuccess(type, data);
        switch (type) {
            case actions.types.TEST_ACTION:
                break;
            default:
                break;
        }
    }

    requestDidFailed(type, data) {
        super.requestDidFailed(type, data);
    }


    componentWillMount() {
    }

    render() {
        const { intl, actions, state: { ui, common } } = this.props;
        return (
            <div className="exchange">
            </div>
        );
    }
}
