import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectPostService } from "services/selectors";
import { CrudTable } from "components/CrudTable";

export class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnsToShow: [
                { path: 'content', label: 'Body' },
                { path: 'title', label: 'Title' }
            ],
            posts: []
        }
        console.log(this);
        
    }

    

    componentDidMount() {
        this.props.postsService && this.props.postsService.getByQuery().then((res) => {
            this.setState({
                posts: res.documents
            });
        })
    }

    edit = (item) => {

    }

    goToCreate = () => {
        return this.props.history && this.props.history.push('/admin/posts/create');
    }

    render() {
        return (
            <div>
                <h2>Posts</h2>
                <div className="row pb-4">
                    <div className="col-sm-3 col-xs-4">
                        <button type="button" name="" id="" className="btn btn-primary btn-lg btn-block" onClick={this.goToCreate}>Create</button>
                    </div>
                </div>
                <CrudTable columnsToShow={this.state.columnsToShow} items={this.state.posts} actions={[{
                    name: "Edit",
                    action: (item, index) => {
                        console.log(item);
                    },
                    className: "btn-success"
                }]}/>                
            </div>
        )
    }
}

PostsList.PropTypes = {
    postsService: PropTypes.object
}

function mapStateProps(state) {
    return  {
        postsService: makeSelectPostService()(state)
    }
}

export default connect(mapStateProps)(PostsList);