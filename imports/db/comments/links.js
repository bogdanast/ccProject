import Comments from '/imports/db/comments/collection';

Comments.addLinks({
    'user': {
        type: 'one',
        collection: Meteor.users,
        field: "userId",
    }
});