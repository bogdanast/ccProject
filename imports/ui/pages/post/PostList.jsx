import React from 'react';
import Posts from '/imports/api/posts/collection'
import { withTracker } from 'meteor/react-meteor-data';
import router from '/imports/routing/router';
import CommentView from "../comment/CommentView";
import Comments from '/imports/api/comments/collection'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.handleGoEdit = this.handleGoEdit.bind(this);
        this.postRemove = this.postRemove.bind(this);
        this.editPost=this.editPost.bind(this);
        this.isPostOwner=this.isPostOwner.bind(this);
    }

    handleGoEdit() {
        router.go("/post/edit");
    }

    isPostOwner = (post) => {
        return post.userId === Meteor.userId()
    };

    editPost = (_id) => {
        router.go('/post/edit/:_id', {_id: _id});
        console.log("ID ul postului este: "+_id);
    }
    postRemove = (postId) => {
        console.log("Id ul postului sters este : "+postId);
        Meteor.call('post.remove', postId);
        console.log("am apasat butonul delete!");
    }

    render() {

        const {loading, posts, comments} = this.props;
        console.log('loading este ' + loading);
        console.log(posts);
        //console.log(comments);

        if (loading) {
            return <div>Waiting for the method</div>
        }

        return (
            <div>
                <h1>Componenta PostList</h1>
                {
                    posts.map(post => {
                        return <div key={post._id}
                                    className={'post'}>{post.title + ' ' + post.description}
                            {this.isPostOwner(post) &&<button onClick={() => this.postRemove(post._id)}>Detele</button>}
                            {this.isPostOwner(post) &&<button onClick={() => this.editPost(post._id)}>Edit</button>}
                            <CommentView comments={post._id}/>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default withTracker((props) => {
    const handle = Meteor.subscribe('posts','comments');

    return {
        loading: !handle.ready(),
        posts: Posts.find({}, {sort: {createdAt: -1}}).fetch(),
        comments: Comments.find().fetch()
    }
})(PostList)