import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Modal } from "antd";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Confirm extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    renderModalComponent = () => {
        const { desc } = this.props;

        return (
            <div className={styles.content}>
                <div>
                    <h4>确认中...</h4>
                    <p>{desc}</p>
                    <p>在您的钱包中确认此交易</p>
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
