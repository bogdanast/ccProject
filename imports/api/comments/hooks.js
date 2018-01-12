import Comments from '/imports/api/comments/collection'

Comments.before.insert(function (userId, comment) {
    console.log(userId);
    console.log('POST OBJECT');
    console.log(comment);
    comment.userId = userId;
    comment.createdAt = new Date();
    comment.username = Meteor.user().emails;

    console.log('ALTERED POST OBJECT');
    console.log(comment);
});
