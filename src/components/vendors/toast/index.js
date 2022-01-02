import _ from "lodash";
import React, { PureComponent } from "react";
import Item from "./item";
import "./style.less";

export default class Toast extends PureComponent {
    constructor(props) {
        super(props);

        this.idx = 1;

        this.state = {
            items: [],
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(data) {
        let item = _.extend({}, data);
        item.id = this.idx;

        this.idx++;

        this.setState({
            items: [...this.state.items, item],
        });
    }

    removeItem(id) {
        this.setState({
            items: [
                ...this.state.items.filter((item) => {
                    return id !== item.id;
                }),
            ],
        });
    }

    render() {
        return (
            <div className="toast">
                {this.state.items.map((item, key) => {
                    return (
                        <Item key={key} data={item} id={item.id} remove={this.removeItem} />
                    );
                })}
            </div>
        );
    }
}
