import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectPostService } from "services/selectors";
import { upperFirst } from "lodash";
import { Editor } from '@tinymce/tinymce-react';
import { Form, Text } from "react-form";
import EditorField from "components/EditorField";

export class PostCompose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
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
        this.props.postsService && this.props.postsService.getByQuery().then((res) => {
            console.log(res);

            alert(res);
        })
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
        const validateTitle = (title) => { return !title? "Title is required" : '' }
        const validateContent = (content) => { return !content? "Content is required" : '' }
        return {
            title: validateTitle(values.title),
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
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Text field="title" id="title" required name="title" type="text" className={`form-control ${formApi.errors.title ? 'is-invalid' : ''}`} id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                <small id="" className="form-text invalid-feedback">Title is required</small>
                            </div>

                            <div className="editor-container">
                                <EditorField
                                    field="content"
                                    id="content"
                                    initialValue="<p>This is the initial content of the editor</p>"
                                    init={{
                                        plugins: 'link image code',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                    }}
                                    onChange={this.handleEditorChange}
                                />
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
        postsService: makeSelectPostService()(state)
    }
}

export default connect(mapStateProps)(PostCompose);