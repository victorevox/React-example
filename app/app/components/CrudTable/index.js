import React from "react";
import PropTypes, { array } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectPostService } from "services/selectors";

export class CrudTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    edit = (item) => {

    }

    goToCreate = () => {

    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {this.props.columnsToShow && this.props.columnsToShow.map((col, index) => {
                                return <th key={index}>{col.label ? col.label : col.path}</th>
                            })}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items && this.props.items.map((item, index) => {
                            <tr key={item._id ? item._id : index}>
                                {this.props.columnsToShow && this.props.columnsToShow.map((prop, key) => {
                                    <td key={key}>
                                        {prop.path !== 'content' &&
                                            <div >{item[prop.path]}</div>

                                        }
                                        {prop.path === 'content' &&
                                            <div innerHtml={item[prop.path]}></div>
                                        }
                                    </td>
                                })}
                                <td>
                                    { this.props.actions && this.props.actions.map((action, key) => {
                                        return (

                                            <button key={key} type="button" className={`btn btn-sm ${action.className? action.className : ''}`} onClick={e => action.action && action.action(item, index, e)}>{action.name}</button>
                                        )
                                    })

                                    }
                                </td>
                            </tr>

                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

CrudTable.PropTypes = {
    columnsToShow: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired
}

function mapStateProps(state) {
    return {
        postsService: makeSelectPostService()(state)
    }
}

export default connect(mapStateProps)(CrudTable);