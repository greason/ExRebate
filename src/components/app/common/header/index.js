import BasePureComponent from "@/common/base/component/pure";
import configs from "@/common/configs";
import { Dropdown } from "antd";
import _ from "lodash";
import React from "react";
import { Link } from "react-router";
import "./style.less";

export default class Header extends BasePureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sidebar: false,
        };
    }

    getActive = (key) => {
        const { pathname } = this.props;
        return _.startsWith(pathname, `/${key}`) ? "active" : "";
    };

    onSwitchLanguage = () => {
        const { intl } = this.props;
        const language = intl.messages.key === "zh" ? "en" : "zh";
        localStorage.setItem(configs.storage.locale, language);
        window.location.reload();
    };

    onMenu = () => {
        this.setState({
            sidebar: !this.state.sidebar,
        });
    };

    render() {
        const {
            intl,
            pathname,
            actions,
            state: {},
            onShowToast,
            onBreak,
        } = this.props;
        const language = intl.messages.key;

        return (
            <div className="header">
                <div className="header-body">
                    <section className="left-region">
                        <Link to="/" className="logo">
                            {this.i18n("appName")}
                        </Link>
                        <ul className="hidden-xs">
                            <li className={this.getActive("guide")}>
                                <Link to="/guide">{this.i18n("guide")}</Link>
                            </li>
                        </ul>
                    </section>
                    <section className="right-region hidden-xs">
                        <Dropdown
                            placement="bottomRight"
                            overlay={
                                <ul className="dropdown-menu">
                                    <li>
                                        <a>{this.i18n("menu.official")}</a>
                                    </li>
                                    <li>
                                        <a>{this.i18n("menu.bug.report")}</a>
                                    </li>
                                </ul>
                            }
                        >
                            <span className="icon-3 icon-more" />
                        </Dropdown>
                    </section>
                    <section className="menu-region visible-xs">
                        <div>
                            <a onClick={this.onMenu} className="icon-menu">
                                <span className={this.state.sidebar ? "icon-9" : "icon-8"} />
                            </a>
                        </div>
                    </section>
                </div>

            </div>
        );
    }
}
