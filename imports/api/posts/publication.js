import {Meteor} from 'meteor/meteor';
import Posts from '/imports/api/posts/collection';
import Comments from '/imports/api/comments/collection'

Meteor.publish('posts', function () {
    //return Posts.find({}, {sort:{createdAt: -1}});
    return Posts.find();
});
Meteor.publish('comments', function () {
    return Comments.find();
});