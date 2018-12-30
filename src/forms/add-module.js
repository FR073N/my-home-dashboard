import React from 'react';
import { connect } from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form';

const validate = values => {
    const errors = {};
    if (!values.apiKey) {
        errors.apiKey = 'Required';
    }
    if (!values.city) {
        errors.city = 'Required';
    }
    if (!values.country) {
        errors.country = 'Required';
    }
    if (!values.units) {
        errors.units = 'Required';
    }
    return errors
};

const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label className="control-label">{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const renderSelect = ({input, label, meta: {touched, error, warning}, children}) => (
    <div>
        <label className="control-label">{label}</label>
        <div>
            <select {...input} >
                {children}
            </select>
        </div>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
);

let renderModuleForm = (selectedModule) => {
    switch(selectedModule) {
        case 'openWeatherMap':
            return (
                <div>
                    <div className="form-group">
                        <Field name="apiKey" component={renderInput} label="API Key"/>
                    </div>
                    <div className="form-group">
                        <Field name="city" component={renderInput} label="City"/>
                    </div>
                    <div className="form-group">
                        <Field name="country" component={renderInput} label="Country"/>
                    </div>
                    <div className="form-group">
                        <Field name="units" component={renderInput} label="Units"/>
                    </div>
                </div>
            );
        default:
            return '';
    }
};

let AddModuleFormCode = props => {
    const {handleSubmit} = props;
    const {moduleValue} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Field name="module" component={renderSelect} label="Module">
                    <option></option>
                    <option value="openWeatherMap">OpenWeatherMap</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">Youtube</option>
                </Field>
            </div>

            { renderModuleForm(moduleValue) }

            <div className="form-group">
                <button type="submit" className="btn btn-primary">Add module</button>
            </div>
        </form>
    )
};




AddModuleFormCode = reduxForm({
    form: 'addModule',
    validate
})(AddModuleFormCode);

// Decorate with connect to read form values
const selector = formValueSelector('addModule');
AddModuleFormCode = connect(
    state => {
        // Adding the module value
        const moduleValue = selector(state, 'module');
        return {
            moduleValue,
        }
    }
)(AddModuleFormCode);

export default AddModuleFormCode;