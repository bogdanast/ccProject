import React from 'react';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import CommentInsertSchema from '/imports/ui/pages/comment/schema'
import Comments from '/imports/api/comments/collection'


export default class CommentView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.commentList = this.commentList.bind(this);
    }

    handleSubmitComment(data, postId) {
        data.postId = postId;
        console.log(data);
        Meteor.call('comment.add', data)
    }

    removeComment = (commentId) => {
        console.log(commentId);
        Meteor.call('comment.remove', commentId);
    }
    commentList = (postId) => {
        console.log(postId);
        Meteor.call("comment.list", postId);
    }


    render() {
        const {postId} = this.props
        const comments = Comments.find();
        return (
            <div>
                {Meteor.userId() ? ( <div>
                    <AutoForm schema={CommentInsertSchema}
                              onSubmit={event => this.handleSubmitComment(event, postId)}>

                        <LongTextField name='text'/>
                        <button type='submit'> Add Comment</button>
                    </AutoForm>

                    {
                        comments.map(comment => {
                            return <div key={comment._id}> {comment.text}
                                <button className="delete" onClick={() => this.removeComment(comment._id)}>
                                    &times;
                                </button>
                            </div>
                        })
                    }
                </div>) : (<div>{this.commentList(postId)}</div>)
                }
            </div>

        );
    }
}