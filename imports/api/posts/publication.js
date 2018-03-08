import {Meteor} from 'meteor/meteor';
import Posts from '/imports/db/posts/collection';
import Comments from '/imports/db/comments/collection'

Meteor.publish('posts', function () {
    return Posts.find();
});
Meteor.publish('comments', function () {
    return Comments.find();
});