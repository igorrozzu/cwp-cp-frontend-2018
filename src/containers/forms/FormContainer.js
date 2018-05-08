import React, { PureComponent } from "react";
import MovieForm from "../../components/forms/MovieForm";
import * as GlobalActions from "../../actions/GlobalActions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CinemaForm from "../../components/forms/CinemaForm";

class FormContainer extends PureComponent {

    constructor()
    {
        super();
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentWillMount()
    {
        if (this.props.match.params.action === 'update') {
            this.props.globalActions.getEntity({
                entityId: this.props.match.params.id,
                entityName: this.props.match.params.entity,
            });
        }
    }

    async submitHandler(formData)
    {
        if (this.props.match.params.action === 'update') {
            this.props.globalActions.updateEntity({
                entityName: this.props.match.params.entity,
                entityId: this.props.match.params.id,
                data: formData,
            });
        } else {
            this.props.globalActions.addEntity({
                entityName: this.props.match.params.entity,
                data: formData,
            });
        }
    }

    mapEntityToForm(entity)
    {
        switch (this.props.match.params.entity) {
            case 'movies':
                return (<MovieForm action={this.props.match.params.action}
                                   movie={entity}
                                   handleSubmit={this.submitHandler}/>);
            case 'cinemas':
                return (<CinemaForm action={this.props.match.params.action}
                                   cinema={entity}
                                   handleSubmit={this.submitHandler}/>)
        }
    }

    renderForm()
    {
        if (this.props.match.params.action === 'update') {
            if (this.props.global.entity !== undefined) {
                return this.mapEntityToForm(this.props.global.entity);
            } else {
                return (<h1>Loading</h1>);
            }
        } else {
            return this.mapEntityToForm({});
        }
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}
const mapStateToProps = store => ({
    global: store.global,
});

const mapDispatchToProps = dispatch => ({
    globalActions: bindActionCreators(GlobalActions, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FormContainer)
);
