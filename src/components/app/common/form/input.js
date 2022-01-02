import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import { Input } from "antd";
import { utils } from "ethers";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class FormInput extends BasePureComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
        };
    }

    onChange = (e) => {
        const { onChange } = this.props;
        onChange && onChange(e.target.value);
    };

    onBlur = () => {
        const { verify, value } = this.props;

        if (verify && value) {
            verify.forEach((item) => {
                if (item.regular === "isAddress") {
                    if (!utils.isAddress(value)) {
                        this.setState({
                            error: item.text,
                        });
                        return;
                    }
                } else {
                    if (!item.regular.test(value)) {
                        this.setState({
                            error: item.text,
                        });
                        return;
                    }
                }

                this.setState({
                    error: "",
                });
            });
        }
    };

    renderModalComponent = () => {
        return <div className={styles.content}></div>;
    };

    render() {
        const { intl, title, tip, placeholder, value, isMe } = this.props;
        const { error } = this.state;

        return (
            <div>
                <div
                    className={`${styles.form} ${error && styles.error}`}
                    onClick={() => {
                        this._input.focus();
                    }}
                >
                    <section>
                        <div>
                            <span>{title}</span>
                            {tip ? <span className="t-warning">{tip}</span> : null}
                        </div>
                        <div>
                            {isMe ? <span className={styles.isMe}>我的地址</span> : null}
                        </div>
                    </section>
                    <section>
                        <Input
                            ref={(o) => {
                                this._input = o;
                            }}
                            placeholder={placeholder}
                            size="small"
                            bordered={false}
                            allowClear={true}
                            value={value}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                        />
                    </section>
                </div>
                {error ? <div className={styles.errorText}>{error}</div> : null}
            </div>
        );
    }
}
