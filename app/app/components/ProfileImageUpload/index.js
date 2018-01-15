/**
*
* ImageUpload
*
*/

import React from 'react';
import ProfilePlaceholder from "./profile-placeholder.jpg";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectNotificationSystem } from 'containers/App/selectors';
import request from "utils/request";
import { AuthHelper } from "utils/auth";
import { merge } from "lodash";
import 'whatwg-fetch';
import { makeSelectAuthenticatedUser } from 'containers/Auth/selectors';

// import styled from 'styled-components';


class ProfileImageUpload extends React.Component { // eslint-disable-line react/prefer-stateless-function

  readyToUpload = false;
  filePicker = null;

  defaultImage = ProfilePlaceholder;
  _file = null;

  constructor(props) {
    super(props); 
    
    this.state = {
      imageSrc: null,
      readyToUpload: false
    }
  }


  componentDidMount() {
    if(!this.state.imageSrc) {
      this.setState({imageSrc: this.props.authenticatedUser && this.props.authenticatedUser.profileImg || this.defaultImage});
    }
  }

  upload = (event) => {
    console.log("upload");
    if(!this._file) console.log("No file found");
    let form = new FormData();
    form.append("file", this._file);
    let options = {
      method: "PUT",
      body: form,
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    }
    let token = AuthHelper.getToken();
    if(token) {
      options.headers = {
        "Authorization": token
      };
    }
    fetch('/api/user', options)
    /* request('/api/user', options) */.then(response => {
      console.log(response);
    })
  }

  check_multifile_logo(file) {
    var extension;
    if(file.substr) {
      extension = file.substr((file.lastIndexOf('.') + 1))
    } else {
      extension = file.type.substr((file.type.lastIndexOf('/') + 1))
    }
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'png' /* || extension === 'bmp' */) {
      return true;
    } else {
      return false;
    }
  }

  fileChange = (event) => {
    console.log(event);
    try {
      let files = this.filePicker.files;
      let file = files[0];
      if(this.check_multifile_logo(file)) {
        if (file && FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          this._file = file;
          reader.onload = (e) => {
            let r = e.target;
            r = r.result;
            if (r) {
              this.setState({imageSrc: r});
              this.setState({readyToUpload: true});
            }
          };
        }
      } else {
        this.props.notificationSystem && this.props.notificationSystem.addNotification({
          level: "error", 
          message: "File type not supported"
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  removeImage = () => {
    console.log("remove");
  }

  render() {
    return (
      <div>
        <Image src={this.state.imageSrc} alt="profile-image" />
        <button onClick={e => { this.state.readyToUpload? this.upload(e) : this.filePicker && this.filePicker.click() }} type="button" name="" id="" className="btn btn-primary btn-lg btn-block">{ this.state.readyToUpload? 'Upload' : 'Edit'}</button>
        {this.state.readyToUpload &&
          <div >
            <button onClick={this.removeImage()} type="button" name="" id="" className="btn btn-warning btn-lg btn-block">Remove</button>
          </div>
        }
        <input ref={(input) => this.filePicker = input} hidden="hidden" onChange={this.fileChange} type="file" name="image-picker" id="image-picker" className="btn btn-primary btn-lg btn-block" />
      </div>
    );
  }
}

ProfileImageUpload.propTypes = {

};

const mapStateProps = (state) => {
  return {
    notificationSystem: makeSelectNotificationSystem()(state),
    authenticatedUser: makeSelectAuthenticatedUser()(state)
  }
}

export default connect(mapStateProps)(ProfileImageUpload);


const Image = styled.img`
  width: 100%;
`