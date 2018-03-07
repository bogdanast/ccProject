import Posts from '/imports/db/posts/collection'
import Comments from '/imports/db/comments/collection'

Posts.addLinks({
    'comments':{
        type: 'one',
        collection: Comments,
        field: 'commentId',
    },
    'user':{
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
});