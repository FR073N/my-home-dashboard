import React from "react";
import { connect } from 'react-redux';
import LoginFormCode from '../../forms/login';

import { authorize } from '../../reducers/authentication';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if(this.props.authentication.token !== null) {
            this.props.history.push('/');
        }
    }

    submit = (values) => {
        this.props.authorize(values.email, values.password);
    };

    render() {
        return(
            <div>
                <h1>Clientside Contacts Application</h1>
                <hr />
                <LoginFormCode onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contacts: state.contacts,
        authentication: state.authentication
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (email, password) => dispatch(authorize(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);