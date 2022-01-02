import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Drawer, Menu } from "antd";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Sidebar extends BasePureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        this.setState({
            visible: true,
        });
    }

    render() {
        const { intl, onDismiss, onSwitchLanguage } = this.props;
        const { visible } = this.state;
        const language = intl.messages.key;

        return (
            <div className={styles.sidebar}>
                <Drawer
                    placement="left"
                    visible={visible}
                    closable={false}
                    mask={false}
                    style={{
                        width: "100vw",
                        marginTop: 57,
                        height: "calc(100% - 57px)",
                    }}
                >
                    <Menu
                        // selectedKeys={[pathname]}
                        style={{
                            borderRight: "none",
                        }}
                        onClick={(menu) => {
                            if (menu.key === "language") {
                                onSwitchLanguage && onSwitchLanguage();
                            } else {
                                // browserHistory.push(menu.key);
                            }

                            onDismiss && onDismiss();
                        }}
                    >
                        <Menu.Item key="course">教程</Menu.Item>
                        <Menu.Item key="bug">BUG上报</Menu.Item>
                        <Menu.Item key="discord">Discord</Menu.Item>
                        <Menu.Item key="slack">Slack</Menu.Item>
                        <Menu.Item key="telegram">电报</Menu.Item>
                        <Menu.Item key="wechat">微信</Menu.Item>
                        <Menu.Item key="language">
                            <div className={styles.language}>
                <span
                    className={classname`${language === "en" ? "active" : ""}`}
                >
                  EN
                </span>
                                <span>/</span>
                                <span
                                    className={classname`${language === "zh" ? "active" : ""}`}
                                >
                  CN
                </span>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Drawer>
            </div>
        );
    }
}
