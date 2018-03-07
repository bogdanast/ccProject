import React from 'react';
import { AutoForm, LongTextField } from 'uniforms-unstyled';
import CommentInsertSchema from '/imports/ui/pages/comment/schema';
import Comments from '/imports/db/comments/collection';
import _ from 'underscore';

export default class CommentView extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.checkIfYouCanDeleteUsersComment = this.checkIfYouCanDeleteUsersComment.bind(this);

        this.state = {
            comments: []
        }
    }

    handleSubmitComment(data, postId) {
        data.postId = postId;
        Meteor.call('comment.add', data)

    }

    removeComment(commentId) {
        Meteor.call('comment.remove', commentId);
    }

    componentDidMount() {
        Meteor.call("comment.list", this.props.postId, (err, res) => {
            if (!err) {
                this.setState({
                    comments: res
                });
            }
        });
    }

    checkIfYouCanDeleteUsersComment(commentUserId){
        // if(commentUserId === Meteor.userId()){
        //     return true;
        // }
        console.log(commentUserId);
       return commentUserId === Meteor.userId();

    }

    render() {
        const {postId} = this.props;
        return (
            <div>
                {
                    Meteor.userId() ? (
                        <div>
                            <AutoForm schema={CommentInsertSchema} onSubmit={event => this.handleSubmitComment(event, postId)}>
                                <LongTextField name='text'/>
                                <button type='submit'>
                                    Add Comment
                                </button>
                            </AutoForm>
                            {
                                this.state.comments.length ? (
                                    <div>
                                        {
                                            _.map(this.state.comments, (comment) => {
                                                return (
                                                    <div className="comment" key={comment._id}>
                                                        <div className="delete-comment">
                                                            { this.checkIfYouCanDeleteUsersComment(comment.userId) && <button className='delete'onClick={() => this.removeComment(comment._id)}>
                                                                &times;
                                                            </button> }
                                                        </div>
                                                        <div className="comment-style">
                                                            {comment.text }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        0 comments
                                    </div>
                                )
                            }

                        </div>
                    ) : (
                        <div>
                            {
                                this.state.comments.length ? (
                                    <div>
                                        {
                                            _.map(this.state.comments, (comment) => {
                                                return (
                                                    <div className="comment">
                                                        <div className="comment-style">
                                                            { comment.text }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        0 comments
                                    </div>
                                )
                            }

                        </div>
                    )
                }
            </div>
        );
    }
}