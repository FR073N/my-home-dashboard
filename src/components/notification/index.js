import React from "react";

import Notification from 'react-web-notification';


class StatisticsNotification extends React.PureComponent {

    displayNotification(title, body, tag, icon, lang = "fr") {

        if(this.state.ignore) {
            return;
        }

        const now = Date.now();

        // const icon = 'http://localhost:3000/Notifications_button_24.png';

        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
            tag: tag,
            body: body + now,
            icon: icon,
            lang: lang,
            dir: 'ltr',
        };

        this.setState({
            title: title + now,
            options: options
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            ignore: true,
            title: ''
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.socialNetwork.lastUpdate !== this.props.socialNetwork.lastUpdate) {
            let nextUpdate = new Date(this.props.socialNetwork.lastUpdate);
            nextUpdate.setMinutes(nextUpdate.getMinutes() + 15);

            this.setState({
                nextUpdate: nextUpdate
            });
        }
    };

    handlePermissionGranted(){
        console.log('Permission Granted');
        this.setState({
            ignore: false
        });
    }
    handlePermissionDenied(){
        console.log('Permission Denied');
        this.setState({
            ignore: true
        });
    }
    handleNotSupported(){
        console.log('Web Notification not Supported');
        this.setState({
            ignore: true
        });
    }

    handleNotificationOnClick(e, tag){
        console.log(e, 'Notification clicked tag:' + tag);
    }

    handleNotificationOnError(e, tag){
        console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag){
        console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag){
        console.log(e, 'Notification shown tag:' + tag);
    }



    render() {

        return (
            <Notification
                ignore={this.state.ignore && this.state.title !== ''}
                notSupported={this.handleNotSupported.bind(this)}
                onPermissionGranted={this.handlePermissionGranted.bind(this)}
                onPermissionDenied={this.handlePermissionDenied.bind(this)}
                onShow={this.handleNotificationOnShow.bind(this)}
                onClick={this.handleNotificationOnClick.bind(this)}
                onClose={this.handleNotificationOnClose.bind(this)}
                onError={this.handleNotificationOnError.bind(this)}
                timeout={5000}
                title={this.state.title}
                options={this.state.options}
            />
        );
    }
}

export default StatisticsNotification;



