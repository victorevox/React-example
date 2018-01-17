import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CrudTable } from "components/CrudTable";
import { makeSelectPageService } from "services/selectors";
import { Form, Text } from "react-form";
import { EditorField } from "components/EditorField";
import { ComposeBase } from "containers/Admin/ComposeBase";
import { makeSelectNotificationSystem } from "containers/App/selectors";

export class PagesComposeClass extends ComposeBase {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        console.log(this);
    }

    fethed = false;
    componentDidMount({...params}) {
        if(this.isEdit()) {
            this.fetchPage();
        }
        super.componentDidMount(params)
    }

    componentDidUpdate() {
        if (!this.fethed && this.isEdit) {
            this.fetchPage();
        }
    }

    fetchPage() {
        this.props.pageService && this.props.pageService.getByQuery({
            filter: {
                where: {
                    "_id": this.props.match && this.props.match.params && this.props.match.params.id
                }
            }
        }).then((res) => {
            console.log(res.documents);
            let page = res && res.documents;
            page = page && page[0];
            if(page) {
                this.formApi.setAllValues(page)
                this.fethed = true;
            }
        })
    }

    onSubmit = (values) => {
        let request = null;
        if(this.isEdit()) {
            request = this.props.pageService && this.props.pageService.update(values).then(res => {
                console.log(res);
                this.props.notificationSystem && this.props.notificationSystem.addNotification({message: "Page updated successfully", level: "success"})
            }).catch(err => {
                this.props.notificationSystem && this.props.notificationSystem.addNotification({message: "Error", level: "error"})
            })
        }
    }

    errorValidator = (values) => {
        const validateContent = (content) => { return !content ? "Content is required" : '' }
        return {
            content: validateContent(values.content)
        }
    }

    render() {
        return (
            <div className="container p-4">
                <h2>{this.state.title} </h2>
                <Form validateError={this.errorValidator} onSubmit={this.onSubmit} getApi={(form => this.formApi = form)}>
                    {formApi => (
                        <form name="post-form" id="post-form" onSubmit={formApi.submitForm} noValidate>
                            <div className="editor-container">
                                <div style={{ padding: ".05em .19em" }} className={`form-control ${formApi.errors.content ? 'is-invalid' : ''}`}>
                                    <EditorField
                                        field="content"
                                        id="content"
                                        // initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                            plugins: 'link image code',
                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                                            inline: true
                                        }}

                                        onChange={this.handleEditorChange}
                                    />
                                </div>
                                <small id="" className="form-text invalid-feedback">Content is required</small>
                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                            </div>
                        </form>
                    )}
                </Form>
            </div>
        )
    }
}

PagesComposeClass.PropTypes = {
    pageService: PropTypes.object
}

function mapStateProps(state) {
    return {
        pageService: makeSelectPageService()(state),
        notificationSystem: makeSelectNotificationSystem()(state)
    }
}

export const PageCompose = connect(mapStateProps)(PagesComposeClass);