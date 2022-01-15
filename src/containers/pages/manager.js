import React from "react";
import BasePureLayout from "@/common/base/layout/pure";
import * as actions from "@/actions";
import { List } from "antd";

const security_key = "aMKieJuQiq0yPq65";

export default class Add extends BasePureLayout {
    constructor(props) {
        super(props);

        this.state = {
            key: "", // for request
            type: "",
        }

        this.data = [
            {
                type: "add.msg",
                title: this.i18n("add.msg")
            },
            {
                type: "add.banner",
                title: this.i18n("add.banner")
            },
            {
                type: "delete.banner",
                title: this.i18n("delete.banner")
            },
            {
                type: "update.banner",
                title: this.i18n("update.banner")
            }
        ];
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    requestDidSuccess(type, data) {
        super.requestDidSuccess(type, data);
        switch (type) {
            case actions.types.TEST_ACTION:
                break;
            default:
                break;
        }
    }

    requestDidFailed(type, data) {
        super.requestDidFailed(type, data);
    }


    componentWillMount() {
    }

    renderContent = () => {

        return <div></div>;
    };

    render() {
        let key = this.props.location.query.key;
        if (key !== security_key) {
            return <div />;
        }

        const { intl, actions, state: { ui, common } } = this.props;
        return (
            <div className="manager">
                <h1>{this.i18n("manager")}</h1>

                <div>
                    <List
                        size="large"
                        header={null}
                        footer={null}
                        bordered
                        dataSource={this.data}
                        renderItem={item => <List.Item>
                            <span style={{ cursor: "pointer" }}>{item.title}</span>
                        </List.Item>}
                    />
                </div>

                {this.renderContent()}
            </div>
        );
    }

}
