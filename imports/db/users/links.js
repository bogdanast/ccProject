import Comments from '/imports/db/comments/collection'
import Posts from '/imports/db/posts/collection'

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'user',
    },
    'comments': {
        collection: Comments,
        inversedBy: 'user',
    }
});