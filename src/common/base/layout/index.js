import * as actions from "@/actions";
import moment from "moment/moment";
import { Component } from "react";

export default class BaseLayout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        const {
            ui: { type, request, data, userInfo },
        } = props.state;

        switch (type) {
            case actions.types.REQUEST_START:
                this.requestDidStart(request, data, userInfo);
                break;
            case actions.types.REQUEST_SUCCESSFUL:
                this.requestDidSuccess(request, data, userInfo);
                break;
            case actions.types.REQUEST_FAILED:
                this.requestDidFailed(request, data, userInfo);
                break;
            default:
                break;
        }
    }

    i18n(key, params) {
        const { intl } = this.props;
        return intl.formatMessage({ id: key }, params);
    }

    formatTimestamp = (timestamp, format = "MM-DD hh:mm") => {
        try {
            return moment(timestamp * 1000).format(format);
        } catch (ex) {
            return "";
        }
    };

    requestDidStart(type, data, userInfo) {
    }

    requestDidSuccess(request, data, userInfo) {
    }

    requestDidFailed(request, data, userInfo) {
    }

    render() {
        return null;
    }
}
