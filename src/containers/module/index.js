import React from "react";
import {connect} from 'react-redux';
import {Statistic, Card, Image, List, Segment} from 'semantic-ui-react';
import {FormattedDate} from 'react-intl';
import {addModule, getModules} from '../../reducers/module';

import AddModuleFormCode from '../../forms/add-module';

class Module extends React.Component {


    /* ----------------------------
            Lifecycle
      --------------------------------------------- */
    constructor(props) {
        super(props);

        this.state = {
            nextUpdate: null,
        };

    }

    componentDidMount() {
        this.props.getModules();

    };

    componentWillUnmount() {
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
            UI
      --------------------------------------------- */
    submit = (values) => {

        let params = {};

        switch(values.module) {
            case "openWeatherMap":
            params = {
                apiKey : values.apiKey,
                city : values.city,
                country : values.country,
                units : values.units,
            };
        }

        this.props.addModule(values.module, params);
    };


    render() {

        return (
            <div>

                <Card>
                    <Card.Content>
                        <Card.Header>
                            Add a new module
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <AddModuleFormCode onSubmit={this.submit}/>
                    </Card.Content>
                </Card>

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
        addModule: (service, publicId, city, units) => dispatch(addModule(service, publicId, city, units)),
        getModules: () => dispatch(getModules()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);