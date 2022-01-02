import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Button, Col, Modal, Row } from "antd";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Token extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    renderModalComponent = () => {
        const { onDismiss } = this.props;
        return (
            <div className={styles.content}>
                <section>
                    <div>以下币种列表可在2层进行更新（V2.0.1版本）</div>
                    <div>
                        VRS，AERGO，ACED，PROB，PIGX，OCB，HUB，KTLYO，1337，CAP，OFT，YPLT，DUCK，XVTX，YLD
                        VLO，BSE，DEFLCT，300，VRS，AERGO，ACED，PROB，PIGX，OCB，HUB，KTLYO，1337，CAP，OFT，YPLT，DUCK，XVTX，YLD，VLO，BSE，DEFLCT，300，VRS，AERGO，ACED，PROB，PIGX，OCB，HUB，KTLYO，1337，CAP，OFT，YPLT，DUCK，XVTX，YLD
                        VLO，BSE，DEFLCT，300，CAP，OFT，YPLT，DUCK，XVTX 已添加
                    </div>
                </section>
                <section>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button
                                type="primary"
                                block={true}
                                ghost={true}
                                onClick={() => {
                                    onDismiss && onDismiss();
                                }}
                            >
                                接受更新
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="primary"
                                block={true}
                                ghost={true}
                                onClick={() => {
                                    onDismiss && onDismiss();
                                }}
                            >
                                忽略
                            </Button>
                        </Col>
                    </Row>
                </section>
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
                title={"  "}
                onCancel={onDismiss}
                closeIcon={<span className={`icon-9 ${styles.iconClose}`} />}
            >
                {this.renderModalComponent()}
            </Modal>
        );
    }
}
