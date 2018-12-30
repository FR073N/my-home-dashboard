import React from "react";
import {connect} from 'react-redux';
import {Statistic, Card, Image, List, Segment} from 'semantic-ui-react';

import config from '../../config';
import {getModules} from "../../reducers/module";

class Home extends React.Component {


    /* ----------------------------
            Lifecycle
      --------------------------------------------- */
    constructor(props) {
        super(props);

        this.state = {
            timeUntilUpdate: 15 * 60 * 1000,
            nextUpdate: null,
        };

    }

    componentDidMount() {
        this.props.getModules();

        this.timer = setInterval(this.tick, 15 * 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.module.lastUpdate !== this.props.module.lastUpdate) {
            let nextUpdate = new Date(this.props.module.lastUpdate);
            nextUpdate.setMinutes(nextUpdate.getMinutes() + 15);

            this.setState({
                nextUpdate: nextUpdate
            });
        }
    };


    /* ----------------------------
            Update
      --------------------------------------------- */
    tick = () => {
        if (this.props.module.lastUpdate === null || this.props.module.loading) {
            return;
        }

        let timeUntilUpdate = this.state.nextUpdate - new Date();
        this.setState({timeUntilUpdate: timeUntilUpdate});

        // Here we'll load the new data again
        if (timeUntilUpdate < 0) {
            this.props.getModules();
        }
    };


    /* ----------------------------
            UI
      --------------------------------------------- */
    renderModuleBlock(key, module) {

        return (
            <Card key={key}>
                <Card.Content>
                    <Card.Header>
                        {module.service}
                    </Card.Header>
                    <Card.Meta>
                        {module.city + ',' + module.country }
                    </Card.Meta>
                    <Card.Description>
                        <List bulleted>
                            <List.Item icon='weather' content={module.data.temp}/>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    };

    secondsToHms(d, mode) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = h > 0 ? h + "h" : "";
        let mDisplay = m > 0 ? m + "m" : "0m";
        let sDisplay = s > 0 ? s + "s" : "0s";

        switch (mode) {
            case 'h':
                return hDisplay;
            case 'h:m':
                return hDisplay + mDisplay;
            default:
                return hDisplay + mDisplay + sDisplay;

        }
    };

    render() {
        let modules = this.props.module.list;

        // Calculate elapsed to tenth of a second:
        let elapsed = Math.round(this.state.timeUntilUpdate / 1000);

        // This will give a number with one digit after the decimal dot (xx.x):
        let elapsedTime = this.secondsToHms(elapsed, 'h:m');

        return (
            <div>
                <Statistic floated='right' size='tiny'>
                    <Statistic.Value>{elapsedTime}</Statistic.Value>
                    <Statistic.Label>Until next update</Statistic.Label>
                </Statistic>

                {modules.length > 0 && <Card.Group>
                    {Object.keys(modules).map((key) => {
                        return this.renderModuleBlock(key, modules[key]);
                    })}
                </Card.Group>}

            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        authentication: state.authentication,
        module: state.module,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getModules: () => dispatch(getModules()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);