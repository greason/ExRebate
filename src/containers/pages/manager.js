import React from "react";
import BasePureLayout from "@/common/base/layout/pure";
import * as actions from "@/actions";
import { Button, Input, List } from "antd";

const security_key = "aMKieJuQiq0yPq65";
const ACTION_TYPE = {
    ADD_BANNER: "add.banner",
    DELETE_BANNER: "delete.banner",
    UPDATE_BANNER: "update.banner",
    ADD_NEWS: "add.news",
};

export default class Add extends BasePureLayout {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            bannerData: [], msgData: [],
            bannerTitle: "",
            bannerImg: "",
            bannerUrl: "",
            bannerUrl2: "",
            newsTitle: "",
            newsUrl: "",
        }

        this.types = [ACTION_TYPE.UPDATE_BANNER, ACTION_TYPE.ADD_NEWS];
        this.data = [];
        let typeSize = this.types.length;
        for (let i = 0; i < typeSize; i++) {
            this.data.push({
                type: this.types[i],
                title: this.i18n(this.types[i])
            });
        }
    }

    componentDidMount() {
        this.props.actions.requestBannerAction({ from: "manager" });
        this.props.actions.requestMsgAction({ from: "manager" });
    }

    requestDidSuccess(type, data) {
        super.requestDidSuccess(type, data);

        if (type === actions.types.REQUEST_BANNER) {
            this.setState({ bannerData: data });
        } else if (type === actions.types.REQUEST_MSG) {
            this.setState({ msgData: data });
        } else if (type === actions.types.REQUEST_UPDATE_BANNER) {
            this.props.onShowToast(this.i18n("update.banner"), "success");
        } else if (type === actions.types.REQUEST_ADD_NEWS) {
            this.props.onShowToast(this.i18n("add.news"), "success");
        }
    }

    requestDidFailed(type, data) {
        super.requestDidFailed(type, data);
    }


    componentWillMount() {
    }

    renderBannerContent = () => {
        return <div className="managerBanner">
            <div>
                <span>{this.i18n("banner.title")}</span>
                <Input value={this.state.bannerTitle} onChange={e => {
                    this.setState({ bannerTitle: e.target.value });
                }} />
            </div>
            <div>
                <span>{this.i18n("banner.img")}</span>
                <Input value={this.state.bannerImg} onChange={e => {
                    this.setState({ bannerImg: e.target.value });
                }} />
            </div>
            <div>
                <span>{this.i18n("banner.url")}</span>
                <Input value={this.state.bannerUrl} onChange={e => {
                    this.setState({ bannerUrl: e.target.value });
                }} />
            </div>
            <div>
                <span>{this.i18n("banner.url2")}</span>
                <Input value={this.state.bannerUrl2} onChange={e => {
                    this.setState({ bannerUrl2: e.target.value });
                }} />
            </div>
        </div>
    }

    renderNewsContent = () => {
        return <div className="managerBanner">
            <div>
                <span>{this.i18n("news.title")}</span>
                <Input value={this.state.newsTitle} onChange={e => {
                    this.setState({ newsTitle: e.target.value });
                }} />
            </div>
            <div>
                <span>{this.i18n("news.url")}</span>
                <Input value={this.state.newsUrl} onChange={e => {
                    this.setState({ newsUrl: e.target.value });
                }} />
            </div>
        </div>
    };

    renderContent = type => {

        if (type === ACTION_TYPE.ADD_BANNER) {
            return this.renderBannerContent();
        } else if (type === ACTION_TYPE.DELETE_BANNER) {

        } else if (type === ACTION_TYPE.UPDATE_BANNER) {
            return this.renderBannerContent();
        } else if (type === ACTION_TYPE.ADD_NEWS) {
            return this.renderNewsContent();
        }

        return <div />;
    };

    renderActionButton = () => {
        return <div style={{ marginTop: 20, marginLeft: 20 }}>
            <Button type="text" style={{ backgroundColor: "blue", color: "#fff" }} onClick={() => {
                if (this.state.type === ACTION_TYPE.UPDATE_BANNER) {
                    this.props.actions.requestUpdateBannerAction({
                        index: 0, title: this.state.bannerTitle,
                        img: this.state.bannerImg, url: this.state.bannerUrl, url2: this.state.bannerUrl2
                    });
                } else if (this.state.type === ACTION_TYPE.ADD_NEWS) {
                    this.props.actions.requestAddNewsAction({
                        title: this.state.newsTitle,
                        url: this.state.newsUrl
                    });
                }
            }
            }>{this.i18n("submit")}</Button>
        </div>
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
                            <span style={{ cursor: "pointer", color: this.state.type === item.type ? "red" : "black" }}
                                  onClick={() => {
                                      let firstBanner = this.state.bannerData[0];
                                      if (item.type === ACTION_TYPE.UPDATE_BANNER && firstBanner) {
                                          this.setState({
                                              type: item.type,
                                              bannerTitle: firstBanner.title,
                                              bannerImg: firstBanner.img,
                                              bannerUrl: firstBanner.url,
                                              bannerUrl2: firstBanner.url2,
                                          });
                                      } else {
                                          this.setState({ type: item.type });
                                      }
                                  }
                                  }>{item.title}</span>
                        </List.Item>}
                    />
                </div>

                <div style={{ paddingTop: 40 }}>
                    {this.renderContent(this.state.type)}
                    {this.state.type && this.renderActionButton()}
                </div>
            </div>
        );
    }

}
