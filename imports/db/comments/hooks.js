import {Comments} from '/imports/db'

Comments.before.insert(function (userId, comment) {
    comment.userId = userId;
    comment.createdAt = new Date();
    comment.username = Meteor.user().emails;
});
