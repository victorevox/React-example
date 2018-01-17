import React from "react";
import PropTypes, { array } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectPostService } from "services/selectors";

export class BlogArchiveClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    fetched = false;

    componentDidMount() {
        if(!this.fetched) {
            this.fetch();
        }
    }

    fetch() {
        this.props.postsService && this.props.postsService.getByQuery().then((res) => {
            let posts = res && res.documents;
            if(posts) {
                this.setState({posts: posts});
                this.fetched = true;
            }
        })
    }

    componentDidUpdate() {
        if(!this.fetched) {
            this.fetch();
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-4 mb-2">Blog</h2>
                <ul className="list-group">
                    {this.state.posts && this.state.posts.map((post, key) => {
                        return (
                            <li key={post._id || key} className="list-group-item  mt-3">
                                <div className="card text-white bg-primary">
                                    <img className="card-img-top" src="holder.js/100px180/" alt="" />
                                    <div className="card-body">
                                        <h4 className="card-title">{post.title}</h4>
                                        <div className="card-text" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                    </div>
                                </div>
                            </li> 
                        )})
                    }
                </ul>
            </div>
        )
    }
}

BlogArchiveClass.PropTypes = {
    postsService: PropTypes.object.isRequired
}

function mapStateProps(state) {
    return {
        postsService: makeSelectPostService()(state)
    }
}

export const BlogArchive = connect(mapStateProps)(BlogArchiveClass);