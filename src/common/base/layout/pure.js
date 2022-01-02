import * as actions from "@/actions";
import moment from "moment/moment";
import { PureComponent } from "react";

export default class BasePureLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(props, nextContext) {
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

    componentWillUnmount() {
        if (document.body.className === this.state.bodyClass) {
            document.body.className = "";
        }
    }

    bodyClass(name) {
        this.state = {
            bodyClass: name
        }
        document.body.className = name
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
