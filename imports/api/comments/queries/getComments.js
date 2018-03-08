import Comments from '/imports/db/comments/collection'

export default Comments.createQuery({
    $filter({filters, params}) {
        filters.postId = params.postId
    },
    $options: {sort: {createdAt: -1}, limit: 5},
    text: 1,
    userId: 1,
    postId: 1,
});

