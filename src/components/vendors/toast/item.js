import iconError from "@/assets/images/icon-error.png";
import iconSuccess from "@/assets/images/icon-success.png";
import classnames from "classnames";
import React, { PureComponent } from "react";
import "./style.less";

const icons = {
    success: iconSuccess,
    error: iconError,
};

export default class Item extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            remove: false,
        };
    }

    componentDidMount() {
        const { data, remove, id } = this.props;

        const delay = data.delay || 2500;
        const time = delay + 500;

        setTimeout(() => {
            this.setState({
                show: false,
            });
        }, delay);

        setTimeout(() => {
            this.setState({
                remove: true,
            });

            remove(id);
        }, time);
    }

    render() {
        const { data } = this.props;

        const className = classnames(
            [
                "toast-item",
                "animated",
                {
                    fadeInRight: this.state.show,
                    fadeOutRight: !this.state.show,
                },
            ],
            data.type
        );

        return this.state.remove ? null : (
            <div className={className}>
                <img src={icons[data.type]} />
                <div>
                    <span>{data.msg}</span>
                    {data.extend ? (
                        <div className="toast-extend">{data.extend}</div>
                    ) : null}
                </div>
            </div>
        );
    }
}
