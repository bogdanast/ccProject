import React from 'react';
import {AutoForm, TextField, LongTextField, ErrorField} from 'uniforms-unstyled';
import createEditSchema from '/imports/ui/pages/post/createPostSchema';
import router from '/imports/routing/router';

export default class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.postId = FlowRouter.current().params._id;

        this.state = {
            post: null,
            loading: true
        }

    }

    componentDidMount() {
        Meteor.call('post.get', this.postId, (err, res) => {
            if (!err) {
                this.setState({
                    post: res,
                    loading: false
                })
            }
        })
    }

    handleEditSubmit = (editedData) => {
        Meteor.call('post.edit', this.postId, editedData, (err) => {
            if (!err) {
                router.go('/post/list');
            }
        });
    }

    render() {
        const {loading, post} = this.state;
        if (loading) {
            return <div>Loading...</div>
        }
        return (<div>
                <AutoForm schema={createEditSchema} onSubmit={this.handleEditSubmit} model={post}>
                    <TextField name='title'/>
                    <ErrorField name='title'/>
                    <LongTextField name='description'/>
                    <ErrorField name='description'/>
                    <button type='submit'> Edit post</button>
                </AutoForm>
            </div>
        );
    }
}