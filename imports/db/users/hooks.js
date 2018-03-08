import {Posts} from '/imports/db'
import {Users} from '/imports/db'

Users.after.remove(function (userId) {
    Posts.remove({
        userId: userId,
    });
});