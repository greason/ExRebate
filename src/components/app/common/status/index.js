import BasePureComponent from "@/common/base/component/pure";
import className from "@/common/classname";
import React from "react";
import styles from "./index.mod.less";

const classname = className(styles);

export default class Footer extends BasePureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { status, text } = this.props;

        return (
            <div className={`styles.status ${styles[status]}`}>
                {status === "confirming" ? (
                    <span className={`icon-2 ${styles.icon}`} />
                ) : null}
                <span className={styles.text}>{text}</span>{" "}
            </div>
        );
    }
}
