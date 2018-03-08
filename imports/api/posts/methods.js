import {Meteor} from 'meteor/meteor';
import PostService from '/imports/api/posts/posts.service'
import {Posts} from '/imports/db'

Meteor.methods({
    'post.create'(post) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        PostService.create(post);
    },
    'post.get'(_id) {
        return PostService.get(_id);
    },
    'post.edit'(_id, editedData) {
        PostService.edit(_id, editedData);
    },
    'post.remove'(_id) {
        const posts = Posts.findOne({_id: _id});
        if (posts.userId !== this.userId) {
            throw new Meteor.Error('you are not the owner and cant delete that post');
        }
        PostService.remove(_id);
    }
});