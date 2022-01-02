import moment from "moment/moment";
import { PureComponent } from "react";

export default class BasePureComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    i18n(key, params) {
        const { intl } = this.props;
        return intl.formatMessage({ id: key }, params);
    }

    formatTimestamp = (timestamp, format = "MM-DD hh:mm:ss") => {
        try {
            return moment(timestamp * 1000).format(format);
        } catch (ex) {
            return "";
        }
    };

    render() {
        return null;
    }
}
