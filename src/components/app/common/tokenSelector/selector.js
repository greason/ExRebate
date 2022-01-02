import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { formatQuoteAsset } from "@/common/format";
import TokenPair from "@/components/app/common/tokenPair";
import { ConfigProvider, Empty, Input, List, Modal, Tabs } from "antd";
import _ from "lodash";
import React from "react";
import styles from "./selector.mod.less";

const { TabPane } = Tabs;
const classname = className(styles);

const customizeRenderEmpty = (searchKey) => (
    <Empty
        image={null}
        description={<span className={styles.empty}>暂未找到({searchKey})</span>}
    />
);

export default class TokenSelector extends BasePureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sort: 0,
            searchKey: "",
            loaded: false,
        };
    }

    componentDidMount() {
        const { onRequestTokenBalance } = this.props;

        onRequestTokenBalance && onRequestTokenBalance("token");
    }

    onChange = (activeKey) => {
        if (activeKey === "lp" && !this.state.loaded) {
            const { onRequestTokenBalance } = this.props;
            onRequestTokenBalance && onRequestTokenBalance("lp");

            this.setState({
                loaded: true,
            });
        }
    };

    onSort = () => {
        const { sort } = this.state;

        this.setState({
            sort: sort === 0 ? 1 : 0,
        });
    };

    onSearch = (e) => {
        this.setState({
            searchKey: e.target.value,
        });
    };

    onSelect = (type, data) => {
        const { onSelect, onDismiss } = this.props;

        if (type === "token") {
            onSelect &&
            onSelect({
                type: type,
                index: data.index,
                symbol: data["token-symbol"],
                icon: [data["token-icon"]],
                balance: data["currency-balance"],
                "contract-address": data["token-contract-address"],
            });
        } else if (type === "lp") {
            onSelect &&
            onSelect({
                type: type,
                index: data.index,
                symbol: `${data["token-a-symbol"]}/${data["token-b-symbol"]}`,
                icon: [data["token-a-icon"], data["token-b-icon"]],
                balance: data["currency-balance"],
            });
        }

        onDismiss && onDismiss();
    };

    renderModalComponent = () => {
        const { tokens, lpTokens, lpVisible = true } = this.props;
        const { sort, searchKey } = this.state;
        let tokenData = tokens;
        let lpTokenData = lpTokens;

        if (searchKey) {
            tokenData = _.filter(tokens, (item) => {
                return (
                    item["token-symbol"].toLowerCase().indexOf(searchKey.toLowerCase()) >=
                    0
                );
            });

            lpTokenData = _.filter(lpTokens, (item) => {
                return (
                    item["token-a-symbol"]
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) >= 0 ||
                    item["token-b-symbol"]
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) >= 0
                );
            });
        }

        tokenData = _.sortBy(tokenData, [
            function (item) {
                return Number(item["currency-balance"]);
            },
        ]);

        lpTokenData = _.sortBy(lpTokenData, [
            function (item) {
                return Number(item["currency-balance"]);
            },
        ]);

        if (sort) {
            tokenData = _.reverse(tokenData);
            lpTokenData = _.reverse(lpTokenData);
        }

        return (
            <ConfigProvider
                renderEmpty={() => {
                    return customizeRenderEmpty(searchKey);
                }}
            >
                <div className={styles.content}>
                    <section className={styles.input}>
                        <Input placeholder="输入代币名称" onChange={this.onSearch} />
                    </section>
                    <section className={styles.tabs}>
                        <Tabs
                            defaultActiveKey="token"
                            tabBarStyle={{
                                marginBottom: 0,
                                paddingLeft: 24,
                            }}
                            onChange={this.onChange}
                        >
                            <TabPane tab={"单币名称"} key="token" className={styles.panel}>
                                <List
                                    header={
                                        <div className={styles.listHeader}>
                                            <span>代币名称</span>
                                            <a
                                                className={`${sort ? styles.desc : ""}`}
                                                onClick={this.onSort}
                                            >
                                                <span className="icon-14" />
                                            </a>
                                        </div>
                                    }
                                    split={false}
                                    dataSource={tokenData}
                                    renderItem={(item) => (
                                        <List.Item className={styles.item}>
                                            <div
                                                className={styles.listItemBody}
                                                onClick={() => {
                                                    this.onSelect("token", item);
                                                }}
                                            >
                                                <section className={styles.tokenPair}>
                                                    <TokenPair data={[item["token-icon"]]} />
                                                    <span>{item["token-symbol"]}</span>
                                                </section>
                                                <section>
                                                    {formatQuoteAsset(item["currency-balance"]) || 0}
                                                </section>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            {lpVisible ? (
                                <TabPane tab={"LP代币名称"} key="lp" className={styles.panel}>
                                    <List
                                        header={
                                            <div className={styles.listHeader}>
                                                <span>LP 名称</span>
                                                <a
                                                    className={`${sort ? styles.desc : ""}`}
                                                    onClick={this.onSort}
                                                >
                                                    <span className="icon-14" />
                                                </a>
                                            </div>
                                        }
                                        split={false}
                                        dataSource={lpTokenData}
                                        renderItem={(item) => (
                                            <List.Item className={styles.item}>
                                                <div
                                                    className={styles.listItemBody}
                                                    onClick={() => {
                                                        this.onSelect("lp", item);
                                                    }}
                                                >
                                                    <section className={styles.tokenPair}>
                                                        <TokenPair
                                                            data={[
                                                                item["token-a-icon"],
                                                                item["token-b-icon"],
                                                            ]}
                                                        />
                                                        <span>
                              {item["token-a-symbol"]}/{item["token-b-symbol"]}
                            </span>
                                                    </section>
                                                    <section>
                                                        {formatQuoteAsset(item["currency-balance"]) || 0}
                                                    </section>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </TabPane>
                            ) : null}
                        </Tabs>
                    </section>
                </div>
            </ConfigProvider>
        );
    };

    render() {
        const { onDismiss } = this.props;

        return (
            <Modal
                visible={true}
                footer={null}
                centered={true}
                title={"选择代币"}
                onCancel={onDismiss}
                closeIcon={<span className={`icon-9 ${styles.iconClose}`} />}
                bodyStyle={{
                    padding: 0,
                }}
            >
                {this.renderModalComponent()}
            </Modal>
        );
    }
}
