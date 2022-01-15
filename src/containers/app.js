import * as actions from "@/actions";
import Footer from "@/components/app/common/footer";
import Header from "@/components/app/common/header";
import Loading from "@/components/vendors/loading";
import Toast from "@/components/vendors/toast";
import classnames from "classnames";
import _ from "lodash";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        const {
            ui: { type, request, data, userInfo },
        } = props.state;

        switch (type) {
            case actions.types.REQUEST_SUCCESSFUL:
                this.requestDidSuccess(request, data, userInfo);
                break;
            case actions.types.REQUEST_FAILED:
            case actions.types.SHOW_TOAST:
                if (data.errMsg) {
                    this.refs.toast.addItem({
                        type: data.type || "error",
                        msg: data.errMsg,
                        extend: data.extend,
                    });

                    _.delay(() => {
                        this.props.actions.clearToast({
                            type: actions.types.CLEAR_TOAST,
                        });
                    }, 2000);
                }
                break;
            case actions.types.CLEAR_TOAST:
                this.refs.toast.removeAll();
                break;
            default:
                break;
        }
    }

    requestDidSuccess(type, data) {
        if (type === actions.types.REQUEST_CURRENCY_AMOUNT) {
            this.setState({
                connect: false,
            });
        }
    }

    requestDidFailed(type, data) {
    }

    onShowToast = (msg, type = "error", extend = null) => {
        this.props.actions.showToast({
            type: actions.types.SHOW_TOAST,
            data: {
                type: type,
                errMsg: msg,
                extend: extend,
            },
        });
    };

    render() {
        const {
            intl,
            state,
            actions,
            children,
            location: { pathname },
        } = this.props;
        const { ui } = state;

        let containerClass = classnames({
            container: true,
        });

        let contentClass = classnames({
            "page-content": true,
        });

        return (
            <div>
                {ui.loading ? <Loading /> : ""}
                {/*<Header
                    intl={intl}
                    state={state}
                    actions={actions}
                    pathname={pathname}
                    onShowToast={this.onShowToast}
                    onBreak={this.onBreak}
                />*/}
                <div className={containerClass}>
                    <div className={contentClass}>
                        {React.cloneElement(children, {
                            intl: intl,
                            state: state,
                            actions: actions,
                            onShowToast: this.onShowToast,
                        })}
                    </div>
                </div>
                <Footer
                    intl={intl}
                    state={state}
                    actions={actions}
                    pathname={pathname}
                    onShowToast={this.onShowToast}
                />
                <Toast ref="toast" />


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(App));
