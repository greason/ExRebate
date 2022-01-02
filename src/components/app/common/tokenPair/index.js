import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class TokenPair extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, size = "default" } = this.props;

        return (
            <div className={`${styles.tokenPair} ${styles[size]}`}>
                {data.map((item, key) => {
                    return <img key={key} src={item} />;
                })}
            </div>
        );
    }
}
