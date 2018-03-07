import Posts from '/imports/db/posts/collection'

export default Posts.createQuery({
    $filter({filters, params}){
        filters.postId= params.postId
    },
    $options: {sort: {createdAt: -1}},
    text: 1,
});

