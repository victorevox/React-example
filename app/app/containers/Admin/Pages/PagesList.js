import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CrudTable } from "components/CrudTable";
import { makeSelectPageService } from "services/selectors";

export class PagesListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnsToShow: [
                { path: 'content', label: 'Body' },
                { path: 'title', label: 'Title' },
                { path: 'updatedAt', label: 'Last Update' }
            ],
            posts: []
        }
        console.log(this);
    }

    
    fethed = false;
    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate() {
        if(!this.fethed) {
            this.fetch();
        }
    }

    fetch() {
        this.props.pageService && this.props.pageService.getByQuery().then((res) => {
            console.log(res.documents);
            this.setState({
                pages: res.documents
            });
            this.fethed = true;
        })
    }

    edit = (item) => {

    }

    goToCreate = () => {
        return this.props.history && this.props.history.push('/admin/pages/create');
    }

    render() {
        return (
            <div>
                <h2>Pages</h2>
                <div className="row pb-4">
                    <div className="col-sm-3 col-xs-4">
                        {/* <button type="button" name="" id="" className="btn btn-primary btn-lg btn-block" onClick={this.goToCreate}>Create</button> */}
                    </div>
                </div>
                <CrudTable columnsToShow={this.state.columnsToShow} items={this.state.pages} actions={[{
                    name: "Edit",
                    action: (item, index) => {
                        console.log(item);
                        this.props.history && this.props.history.push(`/admin/pages/edit/${item._id}`);
                    },
                    className: "btn-success"
                }]}/>                
            </div>
        )
    }
}

PagesListClass.PropTypes = {
    pageService: PropTypes.object
}

function mapStateProps(state) {
    return  {
        pageService: makeSelectPageService()(state)
    }
}

export const PagesList = connect(mapStateProps)(PagesListClass);