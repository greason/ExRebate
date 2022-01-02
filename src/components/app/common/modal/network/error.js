import errorIcon from "@/assets/images/icon-error-lg.png";
import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Modal } from "antd";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Error extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    renderModalComponent = () => {
        return (
            <div className={styles.content}>
                <img src={errorIcon} />
                <div>
                    <h4>网络错误</h4>
                    <p>请在 Metamask 中将网络设置为 Mainnet</p>
                </div>
            </div>
        );
    };

    render() {
        const { onDismiss } = this.props;

        return (
            <Modal
                visible={true}
                footer={null}
                centered={true}
                onCancel={onDismiss}
                closeIcon={<span className={`icon-9 ${styles.iconClose}`} />}
            >
                {this.renderModalComponent()}
            </Modal>
        );
    }
}
