import React from 'react';
import Posts from '/imports/db/posts/collection'
import {withTracker} from 'meteor/react-meteor-data';
import router from '/imports/routing/router';
import CommentView from "../comment/CommentView";
import Comments from '/imports/db/comments/collection'
import _ from 'underscore';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.handleGoEdit = this.handleGoEdit.bind(this);
        this.postRemove = this.postRemove.bind(this);
        this.editPost = this.editPost.bind(this);
        this.isPostOwner = this.isPostOwner.bind(this);
    }

    handleGoEdit() {
        router.go("/post/edit");
    }

    isPostOwner = (post) => {
        return post.userId === Meteor.userId();
    };

    editPost = (_id) => {
        router.go('/post/edit/:_id', {_id: _id});
    }
    postRemove = (postId) => {
        Meteor.call('post.remove', postId);
    }

    render() {

        const {loading, posts, comments} = this.props;
        if (loading) {
            return <div>Waiting for the method</div>
        }

        return (
            <div>
                <h1>Componenta PostList</h1>
                {
                    _.map(posts, (post) => {
                        return <div key={post._id}
                                    className={'post'}>{post.title + ' ' + post.description}
                            {this.isPostOwner(post) &&
                            <button onClick={() => this.postRemove(post._id)}>Detele</button>}
                            {this.isPostOwner(post) && <button onClick={() => this.editPost(post._id)}>Edit</button>}
                            <CommentView postId={post._id} key={post._id}/>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default withTracker((props) => {
    const handle = Meteor.subscribe('posts', 'comments');

    return {
        loading: !handle.ready(),
        posts: Posts.find({}, {sort: {createdAt: -1}}).fetch(),
        comments: Comments.find().fetch()
    }
})(PostList)