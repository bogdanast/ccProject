import React from 'react';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import _ from 'underscore';
import getPosts from '/imports/api/posts/queries/getPost.js'

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.getPosts = this.getPosts.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            posts: [],
            isApproved: false
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {
        Meteor.call("post.lists", true, (err, res) => {
            console.log(res);
            if (!err) {
                this.setState({
                    posts: res
                });
            }
        });
    }
    changeFalse(_id){
        Meteor.call("changeToFalse", true, _id);
        console.log(_id);
    }
    logout(){
        Meteor.logout((err) => {
            if (!err) {
                alert("CONTUL S-A DELOGAT CU SUCCESS!");
                FlowRouter.go('/login');
            } else {
                console.log(err);
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
                                <button onClick={this.changeFalse.bind(this, post._id)}>APASA</button>
                                {post.title + ' ' + post.description}
                            </div>
                        )
                    })
                }
                <a href="/admin/posts/dissaproved">Go to nonapproved posts!</a>
                <input type='button' value='Logout' onClick={this.logout}/>
            </div>
        );
    }
}