import React, { Component } from "react";
import {Route, NavLink, HashRouter, Switch} from "react-router-dom";
import Home from "./containers/home";
import Module from "./containers/module";
import Login from "./containers/login";
import { IntlProvider } from 'react-intl';

import { connect } from 'react-redux';
import { logout } from './reducers/authentication';

class App extends Component {

    handleLogout = () => {
        console.log(this.context);
      //  this.props.logout();

    };

    render() {
        return (
            <IntlProvider locale="en">
                <HashRouter>
                    <div>
                        <ul className="header">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/module">Module</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                        <div className="content">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route exact path="/" component={Home}/>
                                <Route path="/module" component={Module}/>
                            </Switch>
                        </div>
                    </div>
                </HashRouter>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authentication: state.authentication
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (email, password) => dispatch(logout(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);