import Posts from '/imports/db/posts/collection'

Posts.before.insert(function (userId, post) {
    post.createdAt = new Date();
    post.userId = userId;
});

Posts.before.update(function (userId, post, fieldNames, modifier) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt= new Date();
});

