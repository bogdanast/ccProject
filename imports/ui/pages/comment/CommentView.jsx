import React from 'react';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import CommentInsertSchema from '/imports/ui/pages/comment/schema'
import Comments from '/imports/api/comments/collection'

export default class CommentView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.removeComment=this.removeComment.bind(this);
    }

    handleSubmitComment(data) {
        console.log(data);
        Meteor.call('comment.add', data)
    }
    removeComment =(commentId) => {
    console.log(commentId);
    Meteor.call('comment.remove', commentId);
}

    render() {
        const comments = Comments.find();
        return (
            <div>
                <AutoForm schema={CommentInsertSchema} onSubmit={this.handleSubmitComment}>
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
            </div>
        );
    }
}