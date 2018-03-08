import {Posts, Comments, Users} from '/imports/db'

Posts.addLinks({
    'comments': {
        type: 'one',
        collection: Comments,
        field: 'commentId',
    },
    'user': {
        type: 'one',
        collection: Users,
        field: 'userId',
    }
});