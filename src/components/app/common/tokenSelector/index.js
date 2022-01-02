import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { formatQuoteAsset } from "@/common/format";
import TokenPair from "@/components/app/common/tokenPair";
import { Button, InputNumber } from "antd";
import React from "react";
import styles from "./index.mod.less";
import Selector from "./selector";

const classname = className(styles);

export default class TokenSelector extends BasePureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selector: false,
        };
    }

    onShow = () => {
        this.setState({
            selector: true,
        });
    };

    onDismiss = () => {
        this.setState({
            selector: false,
        });
    };

    onInputAmount = (value) => {
        const { onInputAmount } = this.props;

        onInputAmount && onInputAmount(value);
    };

    onSelect = (data) => {
        const { onSelect } = this.props;
        onSelect && onSelect(data);
    };

    renderModalComponent = () => {
        return <div className={styles.content}></div>;
    };

    render() {
        const {
            intl,
            tokens,
            lpTokens,
            lpVisible,
            title,
            data,
            amount,
            disabled,
            onBlur,
            onRequestTokenBalance,
            error,
        } = this.props;

        return (
            <div>
                <div className={styles.wrapper}>
                    <section className={styles.header}>
                        <span>{title}</span>
                        {data ? (
                            <span>
                可用: <b>{formatQuoteAsset(data.balance) || 0} </b>
                                {data.symbol}
              </span>
                        ) : (
                            <span>-</span>
                        )}
                    </section>
                    <section className={styles.body}>
                        <InputNumber
                            placeholder={"0.00"}
                            size="small"
                            bordered={false}
                            disabled={disabled}
                            value={amount}
                            onChange={this.onInputAmount}
                            onBlur={() => {
                                onBlur && onBlur();
                            }}
                        />
                        {data ? (
                            <a className={styles.token} onClick={this.onShow}>
                                {data.balance && data.balance - 0 > 0 ? <div>MAX</div> : null}
                                <div>
                                    <TokenPair data={data.icon} size="large" />
                                    <span>{data.symbol}</span>
                                    <span className="icon-24" />
                                </div>
                            </a>
                        ) : (
                            <Button
                                type="primary"
                                size="small"
                                style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                    marginLeft: "12px",
                                }}
                                onClick={this.onShow}
                                disabled={disabled}
                            >
                                <span>选择代币</span>
                                <span className={`icon-24 ${styles.buttonDownIcon}`} />
                            </Button>
                        )}
                    </section>
                </div>
                {error ? <div className={styles.error}>{error}</div> : null}
                {this.state.selector ? (
                    <Selector
                        intl={intl}
                        tokens={tokens}
                        lpTokens={lpTokens}
                        lpVisible={lpVisible}
                        onDismiss={this.onDismiss}
                        onSelect={this.onSelect}
                        onRequestTokenBalance={onRequestTokenBalance}
                    />
                ) : null}
            </div>
        );
    }
}
