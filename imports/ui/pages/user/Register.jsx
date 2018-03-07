import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SchemaRegister from '/imports/ui/schema/registerSchema';

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister=this.handleRegister.bind(this);
    }
    handleRegister(data) {
        Meteor.call('user.register', data, (err) => {
            if(err) {
                alert(err.reason);
            } else {
                alert('This email: ' + data.email + 'whit its password: ' + data.password + " registered with success!");
            }
        });
    }
    render(){
        return(
            <div>
                <h1>DOAMNE AJUTA!</h1>
                <AutoForm  schema={SchemaRegister} onSubmit={this.handleRegister}>
                    <AutoField name="email"/>
                    <AutoField name="password" type='password'/>
                    <AutoField name="password2" type='password'/>
                    <ErrorsField/>
                    <button type='submit'> Register</button>
                    <a href="/login">Go to Login</a>
                </AutoForm>
            </div>
        );
    }
}