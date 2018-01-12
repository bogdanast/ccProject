import {Meteor} from 'meteor/meteor';
import Comments from '/imports/api/comments/collection'

console.log("COMMENTS METHOD");
Meteor.methods({
    'comment.list'(postId) {
        const comments = Comments.find({postId: postId}).fetch();
        console.log(comments);
        return comments;
    },
    'comment.add'(data) {
        if (!this.userId) {
            throw new Meteor.Error('You are not logged IN fag');
        }
        Comments.insert(data);
        console.log(Meteor.user().emails);
    },
    'comment.remove'(_id) {
        const comment = Comments.findOne({_id: _id});
        if (comment.userId !== this.userId) {
            throw new Meteor.Error('you are not the owner and cant delete that post');
        }
        Comments.remove({_id: _id})
    }
});