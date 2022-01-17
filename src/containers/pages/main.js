import BasePureLayout from "@/common/base/layout/pure";
import React from "react";
import * as actions from "@/actions";
import { Carousel, List } from "antd";

export default class Main extends BasePureLayout {
    constructor(props) {
        super(props);

        this.state = {
            bannerData: [], msgData: [],
        };
    }

    componentDidMount() {
        this.props.actions.requestBannerAction();
        this.props.actions.requestMsgAction();
    }

    requestDidSuccess(type, data, userInfo) {
        super.requestDidSuccess(type, data);

        if (type === actions.types.REQUEST_BANNER) {
            this.setState({ bannerData: data });
        } else if (type === actions.types.REQUEST_MSG) {
            this.setState({ msgData: data });
        }
    }

    requestDidFailed(type, data, userInfo) {
        super.requestDidFailed(type, data);
    }


    render() {
        const {
            intl,
            state: {},
        } = this.props;

        return (
            <div className="rebate" style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <Carousel autoplay style={{ width: "60%" }}>
                    {this.state.bannerData.map(item => {
                        return <div key={item.title} style={{
                            display: "flex",
                            flex: 1, flexDirection: "column",
                            alignItems: "center", justifyContent: "center"
                        }} onClick={() => {
                            window.open(item.url);
                        }}>
                            <img style={{ cursor: "pointer", alignItems: "stretch", width: "100%", height: 120 }}
                                 src={item.img} />
                            {item.title && <h3 style={{
                                height: '30px',
                                color: '#000',
                                textAlign: 'center',
                                cursor: "pointer",
                                background: "#30536D"
                            }}>{item.title}</h3>}
                            {item.url2 && <a target="_blank" href={item.url2} style={{
                                display: "flex", flex: 1, justifyContent: "center",
                                color: '#ff294e',
                                fontSize: 16,
                                fontWeight: "bold",
                                textDecoration: "underline",
                                textAlign: 'center',
                                cursor: "pointer",
                            }}>{item.url2}</a>}
                        </div>
                    })}
                </Carousel>

                <div style={{
                    paddingTop: 40, display: "flex", flex: 1, flexDirection: "row",
                }}>
                    <List
                        style={{ display: "flex", flex: 1, marginRight: 20 }}
                        size="large"
                        header={<div>{this.i18n("latest.msg")}</div>}
                        footer={null}
                        bordered
                        dataSource={this.state.msgData.news}
                        renderItem={item => <List.Item>
                            <a target="_blank" href={item.url}>{item.title}</a>
                        </List.Item>}
                    />

                    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                        <List
                            size="large"
                            header={null}
                            footer={null}
                            bordered
                            dataSource={this.state.msgData.tutorials}
                            renderItem={item => <List.Item>
                                <a target="_blank" href={item.url}>{item.title}</a>
                            </List.Item>}
                        />

                        {this.state.msgData.more && <div style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "flex-end",
                            paddingTop: 10,
                            paddingRight: 10
                        }}>
                            <a target="_blank" style={{
                                color: '#ff294e',
                                fontSize: 14,
                                fontStyle: "oblique",
                                textDecoration: "underline",
                            }} href={this.state.msgData.more}>{"<<" + this.i18n("more")}</a>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
