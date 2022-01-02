import errorIcon from "@/assets/images/icon-error-lg.png";
import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Button, Modal } from "antd";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Refuse extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    renderModalComponent = () => {
        const { onDismiss } = this.props;
        return (
            <div className={styles.content}>
                <img src={errorIcon} />
                <div>
                    <h4>交易被拒绝</h4>
                    <Button
                        type="primary"
                        ghost={true}
                        onClick={() => {
                            onDismiss && onDismiss();
                        }}
                    >
                        关闭
                    </Button>
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
