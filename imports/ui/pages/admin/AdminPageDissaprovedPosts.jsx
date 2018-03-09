import React from 'react';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import _ from 'underscore';
import getPosts from '/imports/api/posts/queries/getPost.js'

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.getPosts = this.getPosts.bind(this);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {
        Meteor.call("post.lists", false, (err, res) => {
            console.log(res);
            if (!err) {
                this.setState({
                    posts: res
                });
            }
        });
    }

    render() {
        return (
            <div>

                {
                    _.map(this.state.posts, (post) => {
                        return (
                            <div className="post" key={post._id}>
                                {post.title + ' ' + post.description}
                            </div>
                        )
                    })
                }
                <a href="/admin/posts/approved">Go to approved posts!</a>
            </div>
        );
    }
}
