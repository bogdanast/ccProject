import React from 'react';
import {AutoForm, TextField, LongTextField} from 'uniforms-unstyled';
import createPostSchema from '/imports/ui/pages/post/createPostSchema';
import PostList from '/imports/ui/pages/post/PostList'
import router from '/imports/routing/router';

export default class PostCreate extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleSubmit(data) {
        data.isApproved=false;
        Meteor.call('post.create', data);
    }

    handleLogout() {
        Meteor.logout((err) => {
            if (!err) {
                alert("Contul s-a delogat cu succes!");
                router.go('/login');
            } else {
                console.log(err);
            }
        });
    }

    render() {
        return (<div>
            <AutoForm schema={createPostSchema} onSubmit={this.handleSubmit}>
                <TextField name='title'/>
                <LongTextField name='description'/>
                <button type='submit'> Add post</button>
                <button type='button' onClick={this.handleLogout}>Logout</button>
            </AutoForm>
            <PostList/>
        </div>);
    }
}