import BasePureLayout from "@/common/base/layout/pure";
import React from "react";
import * as actions from "@/actions";
import { Carousel, List } from "antd";

export default class Main extends BasePureLayout {
    constructor(props) {
        super(props);

        this.state = {
            bannerData: [], msgData: [], liveList: []
        };
    }

    componentDidMount() {
        this.props.actions.requestBannerAction();
        this.props.actions.requestMsgAction();
        // this.props.actions.requestJinseListAction({ source: "jinse" });

        fetch('http://api.coindog.com/live/list?id=0&flag=down')
            .then(response => response.json())
            .then(data => {
                let content = data.list[0].lives;
                if (content) {
                    if (content.length > 5) {
                        content = content.splice(0, 5);
                    }
                    this.setState({ liveList: content });
                }
            });

    }

    requestDidSuccess(type, data, userInfo) {
        super.requestDidSuccess(type, data);

        if (type === actions.types.REQUEST_BANNER) {
            this.setState({ bannerData: data });
        } else if (type === actions.types.REQUEST_MSG) {
            this.setState({ msgData: data });
        } else if (type === actions.types.REQUEST_JINSE_LIST && data.list[0]) {
            this.setState({ liveList: data.list[0].lives });
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
                <div className="keywords" style={{
                    display: "flex", flex: 1, flexDirection: "row", paddingTop: 10, paddingBottom: 10,
                    justifyContent: "center"
                }}>
                    <span><a onClick={() => {
                        window.reload();
                    }}>{this.i18n("huobi.register")}</a></span>
                    <span><a onClick={() => {
                        window.reload();
                    }}>{this.i18n("okex.register")}</a></span>
                    <span><a onClick={() => {
                        window.reload();
                    }}>{this.i18n("binance.register")}</a></span>
                </div>
                <Carousel autoplay style={{ width: "60%" }}>
                    {this.state.bannerData.map(item => {
                        return <div key={item.title} style={{
                            display: "flex",
                            flex: 1, flexDirection: "column",
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <img style={{ cursor: "pointer", alignItems: "stretch", width: "100%", height: 120 }}
                                 src={item.img} onClick={() => {
                                window.open(item.url);
                            }} />
                            {item.title && <h3 style={{
                                height: '30px',
                                color: '#000',
                                textAlign: 'center',
                                cursor: "pointer",
                                background: "#30536D"
                            }}>{item.title}</h3>}
                            {item.backup && item.backup.map(url => {
                                    return <a target="_blank" href={url} style={{
                                        display: "flex", flex: 1, justifyContent: "center",
                                        color: '#ff294e',
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        textAlign: 'center',
                                        cursor: "pointer",
                                    }}>{url}</a>
                                }
                            )}
                        </div>
                    })}
                </Carousel>

                <div style={{
                    paddingTop: 40, display: "flex", flex: 1, flexDirection: "row",
                }}>
                    <List
                        style={{ display: "flex", flex: 1, marginRight: 20 }}
                        size="large"
                        // header={<div>{this.i18n("latest.msg")}</div>}
                        header={null}
                        footer={null}
                        bordered
                        dataSource={this.state.liveList}
                        renderItem={item => {
                            let content = item.content;
                            let items = content.split("】");
                            items[0] = items[0].split("【")[1].trim();
                            items[1] = items[1].trim();
                            return <List.Item style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                <span style={{ fontSize: 16, color: "black" }}>{items[0]}</span>
                                {item.url ?
                                    <a target="_blank" href={item.url}>{items[1]}</a> :
                                    <span>{items[1]}</span>}
                            </List.Item>
                        }}
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
