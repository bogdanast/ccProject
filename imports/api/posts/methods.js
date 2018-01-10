import {Meteor} from 'meteor/meteor';
import Posts from '/imports/api/posts/collection'

console.log("imports/api/posts/methods.js");
Meteor.methods({
    'post.create'(post) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Posts.insert(post);
    },
    'post.get'(_id) {
        return Posts.findOne({_id: _id})
    },
    'post.edit'(_id, editedData) {

        Posts.update({_id: _id}, {$set: editedData})
    },
    'post.remove'(_id) {
        const posts = Posts.findOne({_id: _id});
        if (posts.userId !== this.userId) {
            throw new Meteor.Error('you are not the owner and cant delete that post');
        }
        Posts.remove({_id: _id})
    }
});