import Posts from '/imports/api/posts/collection'

Meteor.users.after.remove(function (userId, user) {
    Posts.remove({
        userId: userId,
    });
});