import React  from "react";

import logo from '../../resources/svg/logo.svg';

class Contact extends React.Component {
    render() {
        return (
            <div>
                <h2>GOT QUESTIONS?</h2>
                <p>The easiest thing to do is post on
                    our <a href="http://forum.kirupa.com">forums</a>.
                </p>
                <img src={logo} className="App-logo" alt="logo"/>

            </div>
        );
    }
}

export default Contact;