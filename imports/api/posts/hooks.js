import Posts from '/imports/api/posts/collection'

Posts.before.insert(function (userId, post) {
    console.log(userId);
    console.log('POST OBJECT');
    console.log(post);
    post.createdAt = new Date();
    post.userId = userId;

    console.log('ALTERED POST OBJECT');
    console.log(post);
});

Posts.before.update(function (userId,post,modifier){
    console.log(post);
    console.log('Inainte');
    post.$set = post.$set || {};
    post.$set.updatedAt= new Date();
    //modifier.$set = modifier.$set || {};
    //modifier.$set.updatedAt = new Date();
    console.log("OBIECTUL IN SINE DUPA UPDATE");
    console.log(post);
});


Posts.after.insert(function(userId, doc) {
    // creez notificare -> Nofifications.insert({......})
});
