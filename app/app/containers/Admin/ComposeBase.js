import React from "react";
import { upperFirst } from "lodash";

export class ComposeBase extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let reg = /\/(create|edit)/.exec(this.props.location && this.props.location.pathname);
        let title = reg && reg[1];
        if (title) {
            title = upperFirst(title);
            this.setState({
                title: title
            })
        }
    }

    isEdit() {
        return /\/edit\//.test(this.props.location && this.props.location.pathname)
    }

    isCreate() {
        return /\/create$/.test(this.props.location && this.props.location.pathname)
    }

}