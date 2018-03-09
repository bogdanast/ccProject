import {Posts} from '/imports/db'

export default Posts.createQuery({
    $filter({filters, params}) {
        //filters.postId = params.postId
        filters.isApproved =  params.isApproved;
    },
    $options: {sort: {createdAt: -1}},
    title: 1,
    description: 1,
    userId: 1,
    createdAt: 1,
    isApproved: 1,

});

