import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectPostService } from "services/selectors";
import { Editor } from '@tinymce/tinymce-react';
import { Form, Text } from "react-form";
import { EditorField } from "components/EditorField";
import { makeSelectNotificationSystem } from "containers/App/selectors";
import { ComposeBase } from "containers/Admin/ComposeBase";
export class PostCompose extends ComposeBase {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }



    componentDidMount({...params}) {
        this.props.postsService && this.props.postsService.getByQuery().then((res) => {
            console.log(res);
        })
        super.componentDidMount(params)
    }

    handleEditorChange = (change, some) => {
        console.log(change);
    }

    onSubmit = (values) => {
        console.log(values);
        this.props.postsService.create(values).then(res => {
            console.log(res);
            this.props.history && this.props.history.push('/admin/posts');
        }).catch(err => {
            console.log(err);

        })
    }

    errorValidator(values) {
        const validateTitle = (title) => { return !title ? "Title is required" : '' }
        const validateContent = (content) => { return !content ? "Content is required" : '' }
        return {
            title: validateTitle(values.title),
            content: validateContent(values.content)
        }
    }

    goToCreate = () => {
        return this.props.history && this.props.history.push('/admin/pages/create');
    }

    render() {
        return (
            <div className="container p-4">
                <h2>{this.state.title} </h2>
                <Form validateError={this.errorValidator} onSubmit={this.onSubmit} getApi={(form => this.formApi = form)}>
                    {formApi => (
                        <form name="post-form" id="post-form" onSubmit={formApi.submitForm} noValidate>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Text field="title" id="title" required name="title" type="text" className={`form-control ${formApi.errors.title ? 'is-invalid' : ''}`} id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                <small id="" className="form-text invalid-feedback">Title is required</small>
                            </div>

                            <div className="editor-container">
                                <div style={{padding: ".05em .19em"}} className={`form-control ${formApi.errors.content ? 'is-invalid' : ''}`}> 
                                    <EditorField
                                        field="content"
                                        id="content"
                                        // initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                            plugins: 'link image code',
                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
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

PostCompose.PropTypes = {
}

function mapStateProps(state) {
    return {
        postsService: makeSelectPostService()(state),
        notificationSystem: makeSelectNotificationSystem()(state)
    }
}

export default connect(mapStateProps)(PostCompose);