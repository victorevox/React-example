import { FormField } from "react-form";
import { Editor } from '@tinymce/tinymce-react';
import React, { Component } from "react";


// Define a custom message component
// const Message = ({ color, message }) => {
//     return (
//         <div className="mb-4" style={{ color }}>
//             <small>{message}</small>
//         </div>
//     );
// }

// Define your custom input
// Note, the ...rest is important because it allows you to pass any
// additional fields to the internal <input>.
class CustomEditorWrapper extends Component {

    editor = null;

    componentDidMount() {
        if(this.props.initialValue) {
            this.props.fieldApi && this.props.fieldApi.setValue(this.props.initialValue);
        }
    }

    render() {

        const {
        fieldApi,
            onInput,
            onChange,
            ...rest
      } = this.props;

        const {
        getValue,
            getError,
            getWarning,
            getSuccess,
            setValue,
            setTouched,
      } = fieldApi;

      
      if(this.editor && getValue() !== this.editor.getContent()) {
            this.editor.setContent && getValue() && this.editor.setContent(getValue());
        }

        const error = getError();
        const warning = getWarning();
        const success = getSuccess();

        

        return (
            <div>
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onBlur={(e, tiny) => {
                        setTouched();
                        setValue(tiny.getContent())
                    }}
                    onInit={(event, editor) => {
                        this.editor = editor;
                        this.render();
                    }}
                    onChange={(e, tinyM) => {
                        setValue(tinyM.getContent());
                        if(onChange) {
                            onChange(e, tinyM);
                        }
                    }}
                    {...rest}
                />
                {/* <input
                    value={getValue()}
                    onInput={(e) => {
                        setValue(e.target.value);
                        if (onInput) {
                            onInput(e);
                        }
                    }}

                    {...rest} /> */}
                {/* {error ? <Message color="red" message={error} /> : null}
                {!error && warning ? <Message color="orange" message={warning} /> : null}
                {!error && !warning && success ? <Message color="green" message={success} /> : null} */}
            </div>
        );
    }
}

// Use the form field and your custom input together to create your very own input!
export const EditorField =  FormField(CustomEditorWrapper);