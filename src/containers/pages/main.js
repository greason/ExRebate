import BasePureLayout from "@/common/base/layout/pure";
import React from "react";

export default class Main extends BasePureLayout {
    constructor(props) {
        super(props);

        this.state = {
            channel: "",
        };
    }

    requestDidSuccess(type, data) {
        super.requestDidSuccess(type, data);
    }

    requestDidFailed(type, data) {
        super.requestDidFailed(type, data);
    }


    render() {
        const {
            intl,
            state: {},
        } = this.props;

        return (
            <div className="wallet">
                <div className="test">
                    <div>TEST Nav</div>
                    <a
                        onClick={() => {
                            this.props.onShowToast(
                                "Toast success",
                                "success",
                                <div>
                                    JUST DO IT
                                </div>
                            );
                        }}
                    >
                        Pop Toast
                    </a>
                </div>
            </div>
        );
    }
}
