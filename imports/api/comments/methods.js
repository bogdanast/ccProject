import {Meteor} from 'meteor/meteor';
import {Comments} from '/imports/db'
import getComments from '/imports/api/comments/queries/getComments';
import CommentService from '/imports/api/comments/comment.service'

Meteor.methods({
    'comment.list'(postId) {
        return getComments.clone({postId}).fetch();
    },
    'comment.add'(data) {
        if (!this.userId) {
            throw new Meteor.Error('You are not logged IN fag');
        }

        CommentService.add(data);
    },
    'comment.remove'(_id) {
        const comment = Comments.findOne({_id: _id});
        if (comment.userId !== this.userId) {
            throw new Meteor.Error('you are not the owner and cant delete that comment');
        }
        CommentService.remove(_id);
    }
});