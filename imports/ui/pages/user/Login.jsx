import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import LoginSchema from '/imports/ui/schema/loginSchema';
import router from '/imports/routing/router';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
}
    handleLogin(data){
        const email = data.email;
        const password = data.password;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                // return Meteor.absoluteUrl('/afterlogin');
                //  FlowRouter.go('/');
                console.log('This email:'+ email +' was a success');
                console.log(Meteor.userId());
                router.go('/post/create');
            } else {
                console.log(err);
            }
        })
    }

    logout(){
        Meteor.logout((err) => {
            if (!err) {
               console.log("CONTUL S_A DELOGAT CU SUCCESs!");
            } else {
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Login page</h1>
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <AutoField name="email"/>
                    <AutoField name="password" type='password'/>
                    <ErrorsField/>
                    <button type='submit'> Login</button>
                    <input type='button' value='Logout' onClick={this.logout}/>
                    <a href="/register">Go to Register</a>
                </AutoForm>
            </div>
        );
    }
}