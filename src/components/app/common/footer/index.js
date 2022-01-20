import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import _ from "lodash";
import React from "react";
import { Link } from "react-router";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Footer extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    getActive = (key) => {
        const { pathname } = this.props;
        if (key === "/" && pathname === key) {
            return "active";
        }
        return _.startsWith(pathname, `/${key}`) ? "active" : "";
    };

    render() {
        const { intl } = this.props;

        return (
            <div className="visible-xs">
                <ul className={styles.footer}>
                    <li className={classname`${this.getActive("app")}`}>
                        <a>
                            {/*<img src={iconHome} />*/}
                            <span>{this.i18n("appName")}</span>
                        </a>
                    </li>
                    <li className={classname`${this.getActive("guide")}`}>
                        <Link to="/guide">
                            {/*<img
                                src={
                                    this.getActive("guide") ? iconExchangeActive : iconExchange
                                }
                            />*/}
                            <span>{this.i18n("guide")}</span>
                        </Link>
                    </li>

                </ul>
            </div>
        );
    }
}
