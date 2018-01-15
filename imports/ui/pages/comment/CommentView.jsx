import React from 'react';
import { AutoForm, LongTextField } from 'uniforms-unstyled';
import CommentInsertSchema from '/imports/ui/pages/comment/schema';
import Comments from '/imports/api/comments/collection';
import _ from 'underscore';

export default class CommentView extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        //this.commentList = this.commentList.bind(this);

        this.state = {
            comments: []
        }
    }

    handleSubmitComment(data, postId) {
        data.postId = postId;
        console.log(data);
        Meteor.call('comment.add', data)
    }

    removeComment(commentId) {
        console.log(commentId);
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

    render() {
        const {postId} = this.props;
        //const owner = Meteor.user().emails;
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
                                                            <button className='delete'onClick={() => this.removeComment(comment._id)}>
                                                                &times;
                                                            </button>
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