import Posts from '/imports/db/posts/collection'

Meteor.users.after.remove(function (userId, user) {
    Posts.remove({
        userId: userId,
    });
});